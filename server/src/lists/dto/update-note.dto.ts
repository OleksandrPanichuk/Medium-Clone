import {Field, InputType} from '@nestjs/graphql'
import {IsMongoId, IsString, MaxLength} from 'class-validator'


@InputType()
export class UpdateNoteInput {
    @IsMongoId()
    @Field()
    listId: string

    @MaxLength(200)
    @IsString()
    @Field()
    note: string

    @IsMongoId()
    @Field()
    postId: string
}