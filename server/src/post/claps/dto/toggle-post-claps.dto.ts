import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";


@InputType()
export class TogglePostClapsInput {
    @IsMongoId()
    @Field()
    postId:string

    @IsMongoId()
    @Field()
    userId:string
}

@ObjectType()
class PostClapsCount {
    @Field(() => Int)
    claps:number
}

@ObjectType()
export class TogglePostClapsResponse {
    @Field(() => PostClapsCount)
    _count:PostClapsCount

    @Field(() => ID, {nullable:true})
    id?:string
}


