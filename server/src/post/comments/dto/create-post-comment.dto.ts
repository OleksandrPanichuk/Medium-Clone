import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";



@InputType()
export class CreatePostCommentInput {
    @IsMongoId()
    @Field()
    postId:string


    @IsString()
    @IsNotEmpty()
    @Field()
    content:string 
}