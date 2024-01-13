import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsStrongPassword, IsUUID, MinLength } from "class-validator";


@InputType()
export class ResetPasswordInput {
    @IsNotEmpty()
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    @IsStrongPassword({minLength:8},{message:"Password is too weak"})
    @Field()
    password:string


    @IsUUID(4, {message:"Invalid data"})
    @Field()
    code:string 
}