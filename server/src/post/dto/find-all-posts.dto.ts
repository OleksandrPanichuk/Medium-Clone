import { Field, InputType, Int } from '@nestjs/graphql'
import {IsString, IsEnum, IsInt, IsOptional, IsMongoId} from 'class-validator'
@InputType()
export class FindAllPostsQuery {
	@IsString()
	@IsOptional()
	@Field(() => String, {nullable:true})
	sortBy?: string

	@IsString()
	@IsOptional()
	@Field(() => String, {nullable:true})
	searchValue?:string

	@IsEnum(['asc','desc'])
	@IsOptional()
	@Field(() => String, {nullable:true})
	sortOrder?: 'asc' | 'desc'

	@IsInt()
	@IsOptional()
	@Field(() => Int, {nullable:true})
	take?: number


	@IsInt()
	@IsOptional()
	@Field(() => Int, {nullable:true})
	skip?:number

	@IsOptional()
	@Field(() => String, {nullable:true})
	tag?:string



	@IsOptional()
	@IsMongoId()
	@Field({nullable:true})
	listId?:string


	@IsOptional()
	@IsMongoId()
	@Field({nullable:true})
	creatorId?:string
}
