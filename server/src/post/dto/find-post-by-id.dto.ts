import {InputType, Field} from '@nestjs/graphql'
import {IsMongoId} from 'class-validator'

@InputType()
export class FindPostByIdInput {
    @IsMongoId()
    @Field()
    postId:string

}