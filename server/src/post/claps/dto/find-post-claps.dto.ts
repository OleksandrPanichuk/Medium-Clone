import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@InputType()
export class FindPostClapsInput {
    @IsMongoId()
    @Field()
    postId:string
}