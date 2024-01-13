import { UserEntityWithoutUnusedData } from '@/user/entity/user.entity'
import {Field, ID, InputType, Int, ObjectType} from '@nestjs/graphql'
import {IsString, IsOptional, IsNumber, IsEnum} from 'class-validator'

@InputType()
export class FindTrendingPostsQuery {
    @IsOptional()
    @IsString()
    @Field({nullable:true})
    readonly sortBy?: string


    @IsOptional()
    @IsNumber()
    @Field(() => Int, {nullable:true})
    readonly take?:number


    @IsOptional()
    @IsEnum(['desc','asc'])
    @Field({nullable:true})
    readonly sortOrder?: 'asc' | 'desc'
}


@ObjectType()
export class FindTrendingPostsResponse {
    @Field(() => ID)
    id:string

    @Field()
    title:string

    @Field(() => UserEntityWithoutUnusedData)
    creator: UserEntityWithoutUnusedData

    @Field(() => Boolean)
    public:boolean

    @Field(() => Date)
    createdAt: Date
}