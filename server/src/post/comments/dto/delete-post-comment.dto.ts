import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";


@InputType()
export class DeletePostCommentInput {
    @IsMongoId()
    @Field()
    commentId:string
}