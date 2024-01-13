import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";


@InputType()
export class SendResetPasswordLinkInput {
    @IsEmail({},{message:'Invalid email address'})
    @Field()
    email:string

 //TODO: uncomment in production
 // @IsUrl({},{message:"Invalid url"})
 @IsNotEmpty()
 @Field()
    link:string
}