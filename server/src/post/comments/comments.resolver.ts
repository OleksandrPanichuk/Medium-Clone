import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { PostCommentService } from "./comments.service";
import { PostCommentEntity, PostCommentEntityWithCreator } from "./comments.entity";
import { CreatePostCommentInput, DeletePostCommentInput, FindAllPostCommentsQuery, UpdatePostCommentClapsInput, UpdatePostCommentClapsResponse } from "./dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthenticatedGuard } from "@/common/guard";
import { GqlCurrentUser } from "@/common/decorators";
import { User } from "@prisma/client";



@Resolver()
export class PostCommentResolver {
    constructor(private readonly commentService:PostCommentService) {}

    @Query(() => [PostCommentEntityWithCreator], {name:'findAllPostComments'})
    findAllPostComments(@Args('query') query:FindAllPostCommentsQuery) {
        return this.commentService.findAll(query)
    }


    @Mutation(() => UpdatePostCommentClapsResponse, {name:"updatePostCommentClaps"})
    updatePostCommentClaps(@Args('input') input:UpdatePostCommentClapsInput) {
        return this.commentService.updateClaps(input)
    }

    @UseGuards(GqlAuthenticatedGuard)
    @Mutation(() => PostCommentEntity, {name:"createPostComment"})
    createPostComment(@Args('input') input:CreatePostCommentInput, @GqlCurrentUser() user:User) {
        return this.commentService.create(input, user)
    }

    @UseGuards(GqlAuthenticatedGuard)
    @Mutation(() => PostCommentEntity)
    deletePostComment(@Args('input') input:DeletePostCommentInput, @GqlCurrentUser('id') userId:string) {
        return this.commentService.delete(input, userId)
    }
}