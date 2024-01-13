import {
	ConflictException,
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	HttpStatus, HttpException
} from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { StorageService } from '@/common/storage/storage.service'
import { generateErrorResponse } from '@/common/helpers'
import {
	FullPostEntity,
	PostEntity,
	PostEntityWithCreatorAndTags
} from './post.entity'
import {
	CreatePostInput,
	DeletePostInput,
	FindAllPostsQuery,
	UpdatePostInput
} from './dto'
import { File } from '@/shared/types'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { User } from '@prisma/client'
import { SubscriptionLimits } from '@/shared/constants'
import { FindTrendingPostsQuery, FindTrendingPostsResponse } from './dto/find-trending-posts.dto'

@Injectable()
export class PostService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly storage: StorageService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	public async findAll(query: FindAllPostsQuery): Promise<FullPostEntity[]> {
		try {
			return await this.prisma.posts.findMany({
				where: {
					...(!!query?.searchValue && {
						title: {
							contains: query.searchValue,
							mode: 'insensitive'
						}
					}),
					...(!!query?.tag && {
						tags: {
							some: {
								tag: {
									name: {
										equals: query.tag,
										mode: 'insensitive'
									}
								}
							}
						}
					}),
					...(!!query?.listId && {
						lists: {
							some: {
								id:query.listId
							}
						}
					}),
					...(query.creatorId && {
						creatorId:query.creatorId
					})
				},
				include: {
					creator: {
						select: {
							username:true,
							id:true,
							avatar:true
						}
					},
					tags: {
						include: {
							tag: true
						}
					},
					
					claps: true,
					_count: {
						select: {
							comments: true,
							claps: true,
							lists:true
						}
					}
				},
				skip: query?.skip,
				take: query?.take,
				orderBy: {
					...(query.sortBy
						&& query.sortBy !== 'claps' ? {
								[query.sortBy]: query.sortOrder ?? 'asc'
						  } : {
							claps: {
								_count: query.sortOrder ?? 'asc'
							}
						  }
						),
						
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
	public async findTrendingPosts(query: FindTrendingPostsQuery) : Promise<FindTrendingPostsResponse[]> {
		try {
			return await this.prisma.posts.findMany({
				include: {
					creator: {
						select: {
							username:true,
							avatar:true,
							id:true
						} 
					}
				},
				take:query.take,
				orderBy: {
					...(query.sortBy
						&& query.sortBy !== 'claps' ? {
								[query.sortBy]: query.sortOrder ?? 'asc'
						  } : {
							claps: {
								_count: query.sortOrder ?? 'asc'
							}
						  }
						),
						
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async findById(postId: string, subscribed:boolean, userId:string): Promise<PostEntityWithCreatorAndTags> {
		try {
			const cachedPost = (await this.cacheManager.get(postId)) as
				| PostEntityWithCreatorAndTags
				| undefined

			if (cachedPost) {
				if(cachedPost.public) return cachedPost;

				return {...cachedPost, content: subscribed || userId === cachedPost.creatorId ? cachedPost.content : null}
			}

			const post = await this.prisma.posts.findUnique({
				where: {
					id: postId
				},
				include: {
					creator: {
						select: {
							username:true,
							id:true,
							avatar:true
						}
					},
					tags: {
						include: {
							tag: true
						}
					},
					_count: {
						select: {
							comments: true,
							claps: true,
							lists:true
						}
					}
				}
			})
			if (!post) throw new NotFoundException('Post not found')

			await this.cacheManager.set(postId, post)

			if(post.public) return post

			return {...post, content: subscribed || post.creatorId === userId ? post.content : null}
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async create(
		dto: CreatePostInput,
		user: User
	): Promise<PostEntity> {
		try {
			if(!user.verified) throw new ForbiddenException('User is not verified')

			const userInfo = await this.prisma.user.findUnique({
				where:{
					id:user.id
				},
				select: {
					subscription:true,
					_count: {
						select: {
							createdPosts:true
						}
					}
				}
			})
			if(!userInfo?.subscription?.stripeSubscriptionId && userInfo?._count?.createdPosts >= SubscriptionLimits.POSTS) {
				throw new HttpException('You have reached the limit of the free tier. Please upgrade your plan to get unlimited access', HttpStatus.PAYMENT_REQUIRED)
			}

			const postWithSameName = await this.prisma.posts.findFirst({
				where: {
					creatorId: user.id,
					title: dto.title
				}
			})

			if (postWithSameName?.id)
				throw new ConflictException('Post with this name already exist')

			const post = await this.prisma.posts.create({
				data: {
					content: dto.content,
					attachments: dto.attachments,
					image: dto.image,
					public: dto.public,
					description: dto.description,
					title: dto.title,
					creatorId: user.id
				}
			})
			const tags = await this.prisma.tag.findMany({
				where: {
					id: {
						in: dto.tags
					}
				}
			})

			for await (const tag of tags) {
				await this.prisma.postByTag.create({
					data: {
						postId: post.id,
						tagId: tag.id
					}
				})
			}

			return post
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async update(
		dto: UpdatePostInput,
		userId: string
	): Promise<PostEntity> {
		try {
			const post = await this.prisma.posts.findUnique({
				where: {
					id: dto.postId
				}
			})

			if (!post) throw new NotFoundException('Post not found')

			if (post.creatorId !== userId)
				throw new ForbiddenException('Access Denied', {
					cause: 'You are not a post creator'
				})

			if (dto?.tags?.length) {
				for (const tag of dto.tags) {
					const existingTag = await this.prisma.postByTag.findFirst({
						where: {
							postId: post.id,
							tagId: tag
						}
					})
					if (!existingTag) {
						await this.prisma.postByTag.create({
							data: {
								postId: post.id,
								tagId: tag
							}
						})
					}
				}
			}

			delete dto.postId
			delete dto.tags

			let image: File

			if (dto.image) {
				image = await this.storage.uploadFile(dto.image)
			}
			const updatedPost: PostEntityWithCreatorAndTags =
				await this.prisma.posts.update({
					where: {
						id: post.id,
						creatorId: userId
					},
					data: {
						...dto,
						image,
						tags: undefined
					},
					include: {
						creator: {
							select: {
								username:true,
								id:true,
								avatar:true
							}
						},
						tags: {
							include: {
								tag: true
							}
						},
						_count: {
							select: {
								comments: true,
								claps: true,
								lists:true
							}
						}
					}
				})
			await this.cacheManager.set(updatedPost.id, updatedPost)

			return updatedPost
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async delete(dto: DeletePostInput, userId: string) {
		try {
			const post = await this.prisma.posts.findFirst({
				where: {
					id: dto.postId,
					creatorId: userId
				}
			})
			if (!post) throw new NotFoundException('Post not found')

			if (post?.attachments?.length > 0) {
				for (const attachment of post.attachments) {
					await this.storage.deleteFile(attachment.key)
				}
			}

			await this.storage.deleteFile(post.image.key)
			await this.cacheManager.del(post.id)

			return await this.prisma.posts.delete({
				where: {
					id: dto.postId,
					creatorId: userId
				}
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

}
