import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class File {
	@IsString()
	@Field()
	url: string

	@IsString()
	@Field()
	key: string
}

@InputType()
export class FileInput {
	@IsString()
	@Field()
	url: string

	@IsString()
	@Field()
	key: string
}

export type TypeFileUpload = {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => NodeJS.ReadableStream
}
