import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";


@InputType()
export class FindListByIdInput {
    @IsMongoId()
    @Field()
    listId:string 


}