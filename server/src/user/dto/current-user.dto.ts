import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "../entity/user.entity";

@ObjectType()
export class CurrentUserResponse extends UserEntity {
    @Field(() => Boolean)
    subscribed:boolean
}