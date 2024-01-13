import { PostByTagEntityWithTag, PostEntity } from "@/post/post.entity";
import { UserEntityWithoutUnusedData } from "@/user/entity/user.entity";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt, IsMongoId, IsOptional } from "class-validator";


@InputType()
export class FindListPostsInput {

  
	@IsInt()
	@IsOptional()
	@Field(() => Int, {nullable:true})
	take?: number


	@IsInt()
	@IsOptional()
	@Field(() => Int, {nullable:true})
	skip?:number

    @IsMongoId()
    @Field()
    listId:string
}


@ObjectType()
export class FindListPostsResponse extends PostEntity {
    @Field(() => UserEntityWithoutUnusedData)
	creator: UserEntityWithoutUnusedData

	@Field({nullable:true})
	note?: string

    @Field(() => [PostByTagEntityWithTag])
	tags: PostByTagEntityWithTag[]
}