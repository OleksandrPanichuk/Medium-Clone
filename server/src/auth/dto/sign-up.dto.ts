import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MinLength
} from 'class-validator'

@InputType()
export class SignUpInput {
	@IsEmail()
	@IsNotEmpty()
	@Field()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	@IsStrongPassword(null, { message: 'Password is too weak' })
	@MinLength(8, { message: 'The password must be at least 8 characters long' })
	@Field()
	readonly password: string

	@IsNotEmpty()
	@IsString()
	@Field()
	readonly username: string
}
