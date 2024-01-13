import { InputType, Field, ObjectType, ID, Int } from '@nestjs/graphql'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { FileInput, TypeFileUpload } from '@/shared/types'
import { IsArray, IsJSON, IsMongoId, IsOptional, IsString } from 'class-validator'
import { GraphQLJSON } from 'graphql-type-json'


@InputType()
export class UpdatePostInput {

	@IsMongoId()
	@Field()
	postId:string

	@IsOptional()
	@Field(() => GraphQLUpload, {nullable:true})
	image?:TypeFileUpload

	@IsString()
	@IsOptional()
	@Field(() => String, {nullable:true})
	title?:string

	@IsOptional()
	@IsString()
	@Field(() => String, {nullable:true})
	description?:string

	@IsOptional()
	@IsJSON()
	@Field(() => GraphQLJSON, {nullable:true})
	content?: any

	@IsOptional()
	@IsArray()
	@Field(() => [FileInput], {nullable:true})
	attachments?: FileInput[]

	@IsOptional()
	@IsArray()
	@IsMongoId({ each: true })
	@Field(() => [String], {nullable:true})
	tags?:string[]
}



@ObjectType() 
export class UpdatePostClapsResponse {
	@Field(() => ID)
	id:string

	@Field(() => Int)
	claps:number
}

@InputType()
export class UpdatePostClapsInput {
	@IsMongoId()
	@Field()
	postId:string
}