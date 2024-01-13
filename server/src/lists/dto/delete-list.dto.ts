import { Field, InputType } from '@nestjs/graphql'
import { IsMongoId } from 'class-validator'

@InputType()
export class DeleteListInput {
	@IsMongoId()
	@Field()
	listId: string
}
