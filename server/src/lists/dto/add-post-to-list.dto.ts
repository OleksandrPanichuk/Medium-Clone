import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";


@InputType()
export class AddPostToListInput {
    @IsMongoId()
    @Field()
    listId:string


    @IsMongoId()
    @Field()
    postId:string
}

@ObjectType()
export class AddPostToListResponse {
    @Field()
    message:string
}