import { Field, InputType } from '@nestjs/graphql'
import {
	IsBoolean,
	IsMongoId,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class UpdateListInput {
	@IsMongoId()
	@Field()
	listId: string

	@IsOptional()
	@IsString()
	@MaxLength(60)
	@MinLength(1)
	@Field({ nullable: true })
	name?: string

	@IsOptional()
	@IsString()
	@MaxLength(280)
	@Field({ nullable: true })
	description?: string

	@IsOptional()
	@IsBoolean()
	@Field(() => Boolean, { nullable: true })
	public?: boolean
}
