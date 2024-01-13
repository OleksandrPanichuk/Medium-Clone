import { Avatar } from "@/user/entity/avatar.entity";
import { Field, InputType, Int ,ID , ObjectType} from "@nestjs/graphql";
import { IsEnum, IsInt, IsOptional, IsString} from "class-validator";
import { UserEntity } from "@/user/entity/user.entity";


@InputType()
export class SearchUsersQuery {
    @IsOptional()
    @IsString()
    @Field(() => String, {nullable:true})
    searchValue?:string 

    @IsOptional()
    @IsInt()
    @Field(() => Int, {nullable:true})
    take?:number 

    @IsOptional()
    @Field(() => String, {nullable:true})
    sortBy?:keyof UserEntity 

    @IsOptional()
    @IsEnum(['asc','desc'])
    @Field(() => String , {nullable:true})
    sortOrder?:'asc' | 'desc' 


    @IsOptional()
    @IsInt()
    @Field(( ) => Int, {nullable:true})
    skip?:number
    
}

@ObjectType()
export class SearchUsersResponse {
    @Field(() => ID)
    id:string

    @Field()
    username:string

    @Field(() => Avatar, {nullable:true})
    avatar?: Avatar

    @Field({nullable:true})
    about?:string
}