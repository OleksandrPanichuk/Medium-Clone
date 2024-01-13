import { UserEntity } from "@/user/entity/user.entity"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class PostCommentEntity {
	@Field(() => ID)
	id: string
    
	@Field()
	postId: string

	@Field()
	creatorId: string

	@Field()
	content: string

	@Field(() => Int)
	claps: number

	@Field(() => Date)
	createdAt:Date 
}


@ObjectType()
export class PostCommentEntityWithCreator extends PostCommentEntity {
	@Field(() => UserEntity)
	creator:UserEntity
}