import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";


@InputType()
export class SendVerificationLinkInput {
    //TODO: uncomment in production
    @IsNotEmpty()
    // @IsUrl({},{message:"Invalid url"})
    @Field()
    link: string

}