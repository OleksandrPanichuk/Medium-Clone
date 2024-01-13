import { Field, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"

@ObjectType()
export class Avatar {
	@IsString()
	@Field()
	url: string

	@Field({ nullable: true })
	key: string
}