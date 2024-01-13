import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import {
	IsArray,
	IsBoolean,
	IsJSON,
	IsMongoId,
	IsNotEmpty,
	IsString
} from 'class-validator'
import { FileInput } from '@/shared/types'

@InputType()
export class CreatePostInput {
	@Field(() => [FileInput])
	attachments: FileInput[]

	@IsString()
	@IsNotEmpty()
	@Field()
	description: string

	@IsJSON()
	@Field(() => GraphQLJSON)
	content: any

	@Field(() => FileInput)
	image: FileInput

	@IsNotEmpty()
	@IsString()
	@Field()
	title: string

	@IsBoolean()
	@Field(() => Boolean)
	public: boolean

	@IsArray()
	@IsMongoId({ each: true })
	@Field(() => [String])
	tags: string[]
}
