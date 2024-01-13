import { PrismaService } from '@/common/prisma/prisma.service'
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { FindManyTagsQuery, FindTagByNameInput } from './dto'
import { generateErrorResponse } from '@/common/helpers'
import { TagEntityWithCount } from './tag.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class TagService {
	constructor(private readonly prisma: PrismaService, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	public async findMany(
		query?: FindManyTagsQuery
	): Promise<TagEntityWithCount[]> {
		try {
			return  await this.prisma.tag.findMany({
				where: {
					...(query.searchValue && {
						name: {
							contains: query.searchValue,
							mode: 'insensitive'
						}
					})
				},
				include: {
					_count: {
						select: {
							posts: true
						}
					}
				},
				orderBy: {
					...(query.sortBy
						&& query.sortBy !== 'posts' ? {
								[query.sortBy]: query.sortOrder ?? 'asc'
						  } : {
							posts: {
								_count: query.sortOrder ?? 'asc'
							}
						  }
						),
						
				},
				take: query.take,
				skip: query.skip
			})
		} catch (err) {
		
			throw new InternalServerErrorException('Internal Server Error')
		}
	}

	public async findByName(
		input: FindTagByNameInput
	): Promise<TagEntityWithCount> {
		try {
			const cachedTag = await this.cacheManager.get<TagEntityWithCount>(`tag:${input.tagName}`)
			if(cachedTag) {
				return cachedTag
			}
			const tag = await this.prisma.tag.findFirst({
				where: {
					name: input.tagName
				},
				include: {
					_count: {
						select: {
							posts: true
						}
					}
				}
			})


			if(tag) {
				await this.cacheManager.set(`tag:${tag.name}`, tag)
			}

			return tag
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
