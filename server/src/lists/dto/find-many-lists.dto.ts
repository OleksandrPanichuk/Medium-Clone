import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsInt, IsMongoId, IsOptional, IsString } from "class-validator";
import { ListEntityWithCreatorWithCount } from "../list.entity";





@InputType()
export class FindManyListsInput {
    @IsOptional()
    @IsInt()
    @Field(() => Int, {nullable:true})
    take?:number


    @IsOptional()
    @IsInt()
    @Field(() => Int, {nullable:true})
    skip?:number


    @IsOptional()
    @IsMongoId()
    @Field({nullable:true})
    creatorId?:string


    @IsOptional()
    @IsArray()
    @Field(() => [String], {nullable:true})
    lists?: string[]


    @IsOptional()
    @IsString()
    @Field({nullable:true})
    searchValue?:string


    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, {nullable:true})
    withoutCurrentUserLists?:boolean

}



@ObjectType()
class FindManyListsPost {
    @Field()
    id:string
}
@ObjectType()
export class FindManyListsResponse extends ListEntityWithCreatorWithCount {
    @Field(() => [FindManyListsPost])
    posts:FindManyListsPost[]
}
