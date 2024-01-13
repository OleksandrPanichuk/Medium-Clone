import { InputType, ObjectType } from "@nestjs/graphql";
import { AddPostToListInput, AddPostToListResponse } from "./add-post-to-list.dto";


@InputType()
export class RemovePostFromListInput extends AddPostToListInput {}

@ObjectType()
export class RemovePostFromListResponse  extends AddPostToListResponse {}