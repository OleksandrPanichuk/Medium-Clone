import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { generateErrorResponse } from '@/common/helpers'
import { StorageService } from '@/common/storage/storage.service'
import { SearchUsersQuery, SearchUsersResponse, UpdateUserInput } from '@/user/dto'

import {
	PrismaClientUnknownRequestError,
	PrismaClientKnownRequestError,
	PrismaClientValidationError
} from '@prisma/client/runtime/library'
import { UserEntity } from './entity/user.entity'
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Cache} from 'cache-manager'


@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly storage: StorageService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}



	public async search(query: SearchUsersQuery, currentUserId?:string): Promise<SearchUsersResponse[]>  {
		try {
			
			const users = await this.prisma.user.findMany({
				where: {
					...(!!query.searchValue && {
						username: {
							contains: query.searchValue,
							mode:'insensitive'
						}
					}),
					...(currentUserId && {
						id: {
							not:currentUserId
						}
					})
				},
				orderBy: {
					...(query.sortBy && {
						[query.sortBy]: query.sortOrder ?? 'asc'
					})
				},
				take:query.take,
				skip:query.skip,
				select :{
					avatar:true,
					username:true,
					id:true,
					about:true
				}
			})
			return users
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}


	public async getPostsCount(userId:string) : Promise<number> {
		try {
			const data = await this.prisma.user.findFirst({
				where :{
					id:userId
				},
				select: {
					_count: {
						select: {
							createdPosts:true,
						}
					}
				}
			})

			return data._count.createdPosts
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async findById(userId: string): Promise<UserEntity> {
		try {
			const cachedUser = await this.cacheManager.get<UserEntity>(`user:${userId}`)

			if(cachedUser) {
				return cachedUser
			}

			const user: UserEntity = await this.prisma.user.findUnique({
				where: {
					id: userId
				},

			})
			if (!user) {
				throw new NotFoundException('User not found')
			}

			await this.cacheManager.set(`user:${user.id}`, {...user, hash: user.hash ? 'hash' : null})

			return user
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async findByEmail(email: string): Promise<UserEntity> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					email
				}
			})
			if (!user) {
				throw new NotFoundException('User not found')
			}
			return user
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
	public async updateAvatar(
		file: any,
		userId: string
	): Promise<UserEntity> {
		try {
			const user = await this.findById(userId)

			const avatar = await this.storage.uploadFile(file)

			if (!avatar)
				throw new InternalServerErrorException('Something went wrong')

			if (user?.avatar?.key) {
				await this.storage.deleteFile(user.avatar.key)
			}

			const updatedUser: UserEntity =  await this.prisma.user.update({
				where: {
					id: userId
				},
				data: {
					avatar
				},
			})

			await this.cacheManager.set(`user:${updatedUser.id}`, {...updatedUser, hash: updatedUser.hash ? 'hash' : null})

			return updatedUser
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async update(
		dto: UpdateUserInput,
		userId: string
	): Promise<UserEntity> {
		try {
			
			return await this.prisma.user
				.update({
					where: {
						id: userId
					},
					data: dto
				}).then(async (data) => {
					await this.cacheManager.set(`user:${data.id}`, {...data, hash: data.hash ? 'hash' : null} )
					return data
				})
				.catch((err) => {
					if (err instanceof PrismaClientKnownRequestError) {
						//P2025 - An operation failed because it depends on one or more records that were required but not found
						if (err.code === 'P2025')
							throw new NotFoundException('User not found', {
								description: 'user/user-not-found'
							})

						//P2023 - Inconsistent column data
						if (err.code === 'P2023')
							throw new BadRequestException('Invalid data', {
								description: 'user/validation-error',
								cause: err.message
							})
					}
					if (err instanceof PrismaClientUnknownRequestError) {
						throw new InternalServerErrorException('Failed to update user', {
							cause: err.message,
							description: 'user/internal-error'
						})
					}

					if (err instanceof PrismaClientValidationError) {
						throw new BadRequestException('Failed to validate data', {
							cause: err.message,
							description: 'user/validation-error'
						})
					}

					throw new InternalServerErrorException('Failed to update user', {
						description: 'user/update-failed'
					})
				})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
