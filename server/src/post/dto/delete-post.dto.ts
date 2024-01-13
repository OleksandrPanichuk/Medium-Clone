import { Field, InputType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'

@InputType()
export class DeletePostInput {
	@IsMongoId()
	@Field()
	postId: string
}
