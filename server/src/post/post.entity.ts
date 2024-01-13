import { File } from '@/shared/types'
import { TagEntity } from '@/tag/tag.entity'
import { UserEntityWithoutUnusedData } from '@/user/entity/user.entity'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { IsMongoId, IsOptional } from 'class-validator'
import { GraphQLJSON } from 'graphql-type-json'
import { PostClap } from './claps/claps.entity'
import { JsonValue } from '@prisma/client/runtime/library'

@ObjectType()
export class PostEntity {
	@Field(() => ID)
	@IsMongoId()
	id: string

	@Field()
	title: string

	@IsOptional()
	@Field(() => [File], { nullable: true })
	attachments?: File[]


	@Field(() => GraphQLJSON, {nullable:true})
	content: JsonValue

	@Field()
	description: string

	@Field(() => Date)
	createdAt: Date

	@Field()
	creatorId: string

	@Field(() => File)
	image: File

	@Field(() => Boolean)
	public: boolean

	@Field(() => Date)
	updatedAt: Date
}


@ObjectType()
export class FullPostEntityCount {
	@Field(() => Int)
	comments: number

	@Field(() => Int)
	claps:number

	@Field(() => Int)
	lists: number
}



@ObjectType()
export class PostByTagEntity {
	@Field()
	id: string

	@Field()
	tagId: string

	@Field()
	postId: string
}

@ObjectType() 
export class PostByTagEntityWithTag extends PostByTagEntity {
	@Field(() => TagEntity)
	tag: TagEntity
}



@ObjectType() 
export class PostEntityWithCreatorAndTags  extends PostEntity {
	@Field(() => UserEntityWithoutUnusedData)
	creator: UserEntityWithoutUnusedData

	@Field(() => FullPostEntityCount)
	_count: FullPostEntityCount

	@Field(() => [PostByTagEntityWithTag])
	tags: PostByTagEntityWithTag[]
}

@ObjectType()
export class FullPostEntity extends PostEntityWithCreatorAndTags {
	@Field(() => [PostClap])
	claps:PostClap[]
}


