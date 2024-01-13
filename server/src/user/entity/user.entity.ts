import { Field, ObjectType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import {
	IsMongoId,
	IsString,
	IsEmail,
	IsDate,
} from 'class-validator'
import {Avatar} from './avatar.entity'

@ObjectType()
export class UserEntity {
	@IsMongoId()
	@Field()
	id: string

	@IsString()
	@Field()
	username: string

	@IsEmail()
	@Field()
	email: string

	@Exclude()
	hash: string

	@IsDate()
	@Field(() => Date)
	createdAt: Date

	@Field(() => Avatar, {nullable:true})
	avatar?: Avatar

	@Field({nullable:true})
	about?:string


	@Field(() => Boolean)
	verified: boolean
}



@ObjectType()
export class UserEntityWithoutUnusedData {
	@IsMongoId()
	@Field()
	id: string

	@IsString()
	@Field()
	username: string

	@Field(() => Avatar, {nullable:true})
	avatar?: Avatar
}