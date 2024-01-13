import { Field, InputType } from '@nestjs/graphql'
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class CreateListInput {
	@IsBoolean()
	@Field(() => Boolean)
	public: boolean

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(60)
	@Field()
	name: string

	@IsOptional()
	@MaxLength(280)
	@IsString()
	@Field({ nullable: true })
	description?: string
}
