import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { TagEntity } from '@/tag/tag.entity'

@InputType()
export class FindManyTagsQuery {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	readonly searchValue?: string

	@IsNumber()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	readonly take?: number

	@IsOptional()
	@IsString()
	@Field(() => String, { nullable: true })
	readonly sortBy?: keyof TagEntity & 'posts'

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	@Field(() => String, { nullable: true })
	readonly sortOrder?: 'asc' | 'desc'

	@IsOptional()
	@IsNumber()
	@Field(() => Int, { nullable: true })
	readonly skip?: number


}
