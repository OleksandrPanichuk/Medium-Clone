import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class PostClap {
	@Field()
	id: string

	@Field()
	postId: string

	@Field()
	userId:string
}