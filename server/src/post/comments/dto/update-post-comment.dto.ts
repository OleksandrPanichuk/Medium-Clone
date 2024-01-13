import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";



@InputType()
export class UpdatePostCommentClapsInput {
    @IsMongoId()
    @Field()
    commentId:string

}

@ObjectType()
export class UpdatePostCommentClapsResponse {
    @Field(() => ID)
    id:string
     

    @Field(() => Int)
    claps:number
}