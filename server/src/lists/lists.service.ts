import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma/prisma.service'
import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import {
	AddPostToListInput,
	AddPostToListResponse,
	CreateListInput,
	DeleteListInput,
	FindListByIdInput,
	FindListPostsInput,
	FindListPostsResponse,
	FindManyListsInput,
	FindManyListsResponse,
	RemovePostFromListInput,
	UpdateListInput,
	UpdateNoteInput
} from './dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import {
	ListEntityWithCreatorWithCount,
	ListForPostEntity
} from './list.entity'
import { DEFAULT_LIST_NAME, SubscriptionLimits } from '@/shared/constants'

@Injectable()
export class ListsService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	public async findMany(
		query: FindManyListsInput,
		userId?: string
	): Promise<FindManyListsResponse[]> {
		try {
			const lists = await this.prisma.lists.findMany({
				where: {
					...(query.creatorId && {
						creatorId: query.creatorId
					}),
					...(query.withoutCurrentUserLists && {
						creatorId: {
							not: userId
						}
					}),
					...(query.lists && {
						id: {
							notIn: query.lists
						}
					}),
					...(query.searchValue && {
						name: {
							contains: query.searchValue,
							mode:'insensitive'
						}
					}),
					public: query.creatorId
						? query.creatorId === userId
							? undefined
							: true
						: true
				},
				include: {
					creator: {
						select: {
							avatar: true,
							username: true,
							id: true
						}
					},
					_count: {
						select: {
							posts: true
						}
					},
					posts: {
						include: {
							post: {
								select: {
									id: true
								}
							}
						}
					}
				},
				take: query.take,
				skip: query.skip
			})
			const data: FindManyListsResponse[] = lists.map((list) => ({
				...list,
				posts: list.posts.map((post) => post.post)
			}))

			return data
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async findById(
		input: FindListByIdInput,
		userId?: string
	): Promise<ListEntityWithCreatorWithCount> {
		try {
			const cachedList = await this.cacheManager.get<
				ListEntityWithCreatorWithCount | undefined
			>(`list:${input.listId}`)
			if (cachedList) {
				if (cachedList.public) return cachedList

				if (cachedList.creatorId !== userId)
					throw new ForbiddenException('List is private')

				return cachedList
			}

			const list = await this.prisma.lists.findUnique({
				where: {
					id: input.listId
				},
				include: {
					creator: {
						select: {
							avatar: true,
							username: true,
							id: true
						}
					},
					_count: {
						select: {
							posts: true
						}
					}
				}
			})

			if (!list) throw new NotFoundException('List not found')

			await this.cacheManager.set(`list:${list.id}`, list)

			if (list.public) {
				return list
			}

			if (list.creatorId !== userId)
				throw new ForbiddenException('List is private')

			return list
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async findListPosts(
		query: FindListPostsInput,
		userId?: string
	): Promise<FindListPostsResponse[]> {
		await this.findById({ listId: query.listId }, userId)
		try {
			const listForPosts = await this.prisma.listForPost.findMany({
				where: {
					listId: query.listId
				},
				take: query.take,
				skip:query.skip,
				include: {
					post: {
						include: {
							creator: {
								select: {
									avatar: true,
									id: true,
									username: true
								}
							},
							tags: {
								include: {
									tag: true
								},
								take: 4
							}
						}
					}
				}
			})

			const posts: FindListPostsResponse[] = listForPosts.map(
				(listForPost) => ({ ...listForPost.post, note: listForPost.note })
			)

			return posts
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async create(
		input: CreateListInput,
		creatorId: string
	): Promise<ListEntityWithCreatorWithCount> {
		try {
			const userInfo = await this.prisma.user.findUnique({
				where:{
					id:creatorId
				},
				select: {
					subscription:true,
					_count: {
						select: {
							lists:true
						}
					}
				}
			})
			if(!userInfo.subscription && userInfo._count.lists >= SubscriptionLimits.LISTS) {
				throw new HttpException('You have reached the limit of the free tier. Please upgrade your plan to get unlimited access', HttpStatus.PAYMENT_REQUIRED)
			}
			
			if (input.name === DEFAULT_LIST_NAME) throw new BadRequestException('Cannot create list with default list name')
			
			
			
			const existingList = await this.prisma.lists.findFirst({
				where: {
					creatorId,
					name: input.name
				}
			})
			if (existingList)
				throw new ConflictException('List with same name already exist')

			const list: ListEntityWithCreatorWithCount =
				await this.prisma.lists.create({
					data: {
						...input,
						creatorId
					},
					include: {
						creator: {
							select: {
								avatar: true,
								id: true,
								username: true
							}
						},
						_count: {
							select: {
								posts: true
							}
						}
					}
				})

			return list
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async update(
		input: UpdateListInput,
		userId: string
	): Promise<ListEntityWithCreatorWithCount> {
		try {
			const list = await this.prisma.lists.findUnique({
				where: {
					id: input.listId,
					creatorId: userId
				}
			})

			if (!list) throw new NotFoundException('List not found')

			const { description, name } = input

			if (list.name === DEFAULT_LIST_NAME && name && name !== DEFAULT_LIST_NAME)
				throw new BadRequestException('Cannot change default list name')

			const updatedList = await this.prisma.lists.update({
				where: {
					id: input.listId,
					creatorId: userId
				},
				data: {
					description,
					name,
					public: input.public
				},
				include: {
					creator: {
						select: {
							avatar: true,
								id: true,
								username: true
						}
					},
					_count: {
						select: {
							posts: true
						}
					}
				}
			})

			await this.cacheManager.set(`list:${updatedList.id}`, updatedList)

			return updatedList
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async addPostToList(
		input: AddPostToListInput,
		userId: string
	): Promise<AddPostToListResponse> {
		try {

			const list = await this.prisma.lists.findUnique({
				where: {
					id: input.listId,
					creatorId: userId
				}
			})
			if (!list) throw new NotFoundException('List not found')

			const userInfo = await this.prisma.user.findUnique({
				where:{
					id:userId
				},
				select: {
					subscription:true,
					lists: {
						where: {
							id: input.listId
						},
						select: {
							_count: {
								select: {
									posts:true
								}
							}
						}
					}
				}
			})
			if(!userInfo.subscription && userInfo.lists[0]._count.posts >= SubscriptionLimits.POSTS_PER_LIST) {
				throw new HttpException('You have reached the limit of the free tier. Please upgrade your plan to get unlimited access', HttpStatus.PAYMENT_REQUIRED)
			}


			const isPostAlreadyInList = await this.prisma.listForPost.findFirst({
				where: {
					listId: input.listId,
					postId: input.postId,
					list: {
						creatorId: userId
					}
				}
			})

			if (isPostAlreadyInList)
				throw new ConflictException('Post already in list')

			await this.prisma.listForPost.create({
				data: {
					listId: input.listId,
					postId: input.postId
				}
			})

			const cachedList =
				await this.cacheManager.get<ListEntityWithCreatorWithCount>(
					`list:${list.id}`
				)

			if (cachedList) {
				cachedList._count.posts += 1
				await this.cacheManager.set(`list:${list.id}`, cachedList)
			}

			return { message: 'Post added to list' }
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
	public async removePostFromList(
		input: RemovePostFromListInput,
		userId: string
	) {
		try {
			const list = await this.prisma.lists.findUnique({
				where: {
					id: input.listId,
					creatorId: userId
				}
			})
			if (!list) throw new NotFoundException('List not found')

			const existingPostInList = await this.prisma.listForPost.findFirst({
				where: {
					listId: input.listId,
					postId: input.postId,
					list: {
						creatorId: userId
					}
				}
			})

			if (!existingPostInList)
				throw new NotFoundException(
					"Cannot remove post from list, because it isn't there at the moment"
				)

			await this.prisma.listForPost.delete({
				where: {
					id: existingPostInList.id
				}
			})

			const cachedList =
				await this.cacheManager.get<ListEntityWithCreatorWithCount>(
					`list:${input.listId}`
				)
			if (cachedList) {
				cachedList._count.posts -= 1
				await this.cacheManager.set(`list:${input.listId}`, cachedList)
			}

			return { message: 'Post removed from list' }
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
	public async updateNote(
		input: UpdateNoteInput,
		userId: string
	): Promise<ListForPostEntity> {
		await this.findById(input, userId)
		try {
			const listForPost = await this.prisma.listForPost.findFirst({
				where: {
					listId: input.listId,
					postId: input.postId
				},
				select: {
					id: true,
					list: {
						select: {
							creatorId: true
						}
					}
				}
			})
			if (!listForPost)
				throw new NotFoundException(
					'Cannot update list item, list item not found'
				)
			if (listForPost.list.creatorId !== userId)
				throw new ForbiddenException("You aren't creator of this list")

			return await this.prisma.listForPost.update({
				where: {
					id: listForPost.id,
					listId: input.listId,
					list: {
						creatorId: userId
					},
					postId: input.postId
				},
				data: {
					note: input.note
				}
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async delete(input: DeleteListInput, userId: string) {
		const list = await this.findById(input, userId)
		try {
			if (list.name === DEFAULT_LIST_NAME)
				throw new BadRequestException('Cannot delete default list')

			await this.prisma.lists.delete({
				where: {
					id: input.listId,
					creatorId: userId,
					name: {
						not: DEFAULT_LIST_NAME
					}
				}
			})
			await this.cacheManager.del(`list:${list.id}`)
			return `List '${list.name}' deleted.`
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
