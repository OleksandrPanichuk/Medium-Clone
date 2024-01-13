import { Field, InputType } from "@nestjs/graphql";
import {IsMongoId} from 'class-validator'

@InputType()
export class FindUserByIdInput {
    @IsMongoId()
    @Field()
    userId:string
}