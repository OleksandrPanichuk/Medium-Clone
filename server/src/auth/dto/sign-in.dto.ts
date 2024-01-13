import { UserEntity } from '@/user/entity/user.entity'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator'

@InputType()
export class SignInInput {
	@IsEmail()
	@IsNotEmpty()
	@Field()
	readonly email: string

	@IsNotEmpty()
	@IsStrongPassword({minLength:8},{message:"Password is too weak"})
	@MinLength(8, { message: 'The password must be at least 8 characters long' })
	@Field()
	readonly password: string
}

@ObjectType()
export class SignInResponse extends UserEntity {
    @Field(() => Boolean)
    subscribed:boolean
}
