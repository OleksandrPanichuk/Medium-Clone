import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class VerifyEmailInput {
    @IsUUID(4, {message:"Invalid data"})
    @Field()
    code: string
}