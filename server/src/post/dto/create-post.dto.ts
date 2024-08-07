import { FileInput } from '@/shared/types'
import { Field, InputType } from '@nestjs/graphql'
import {
	IsArray,
	IsBoolean,
	IsJSON,
	IsNotEmpty,
	IsString
} from 'class-validator'
import { GraphQLJSON } from 'graphql-type-json'

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
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@Field(() => [String])
	tags: string[]
}
