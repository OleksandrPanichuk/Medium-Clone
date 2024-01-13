import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class FindTagByNameInput {
    @Field()
    tagName:string
}