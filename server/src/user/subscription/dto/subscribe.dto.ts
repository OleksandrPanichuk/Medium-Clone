import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";


@InputType()
export class SubscribeInput {
    //TODO: uncomment in production
    // @IsUrl()
    @IsString()
    @IsNotEmpty()
    @Field()
    readonly redirectUrl: string
}