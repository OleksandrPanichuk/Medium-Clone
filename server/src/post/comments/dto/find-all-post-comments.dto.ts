import { Field, InputType, Int } from "@nestjs/graphql";
import {  IsArray, IsMongoId, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PostCommentEntity } from "../comments.entity";



@InputType()
export class FindAllPostCommentsQuery {
    @IsMongoId()
    @Field()
    postId:string

    @IsOptional()
    @IsMongoId()
    @Field(() => String, {nullable:true})
    creatorId?:string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Field(() => Int,{nullable:true})
    take?:number

    @IsOptional()
    @IsArray()
    @Field(() => [String], {nullable:true})
    comments?:string[]

  
    @IsString()
    @IsOptional()
    @Field(() => String, {nullable:true})
    sortBy?:keyof PostCommentEntity

}