import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { PostService } from './post.service'
import { FullPostEntity, PostEntity, PostEntityWithCreatorAndTags } from './post.entity'
import { GqlCurrentUser } from '@/common/decorators'
import GraphQLJSON from 'graphql-type-json'
import { DeletePostInput, CreatePostInput, FindAllPostsQuery, FindPostByIdInput, UpdatePostInput } from './dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthenticatedGuard } from '@/common/guard'
import { User } from '@prisma/client'
import { FindTrendingPostsQuery, FindTrendingPostsResponse } from './dto/find-trending-posts.dto'
import { SubscriptionService } from '@/user/subscription/subscription.service'


@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService, private readonly subscriptionService:SubscriptionService) {}

	@Query(() => [FullPostEntity], { name: 'findAllPosts' })
	findAll(@Args('query') query: FindAllPostsQuery) {
		return this.postService.findAll(query)
	}

	@Query(() => [FindTrendingPostsResponse], {name:'findTrendingPosts'})
	findTrendingPosts(@Args('query') query:FindTrendingPostsQuery) {
		return this.postService.findTrendingPosts(query)
	}

	@Query(() => PostEntityWithCreatorAndTags, {name:"findPostById"})
	async findById(@Args('input') input:FindPostByIdInput, @GqlCurrentUser('id') userId?:string) {
		let subscribed :boolean = false 
		if(userId) {
			subscribed = await this.subscriptionService.checkSubscription(userId)
		}
		return await this.postService.findById(input.postId, subscribed, userId)
	}


	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => PostEntity, { name: 'createPost' })
	createPost(
		@GqlCurrentUser() user: User,
		@Args('input', {type:() => CreatePostInput}) input: CreatePostInput
	) {
		return this.postService.create(input, user)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => PostEntity, {name:"updatePost"})
	updatePost(@Args('input', {type:() => UpdatePostInput}) input:UpdatePostInput, @GqlCurrentUser('id') userId:string ) {
		return this.postService.update(input, userId)
	}

	

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => GraphQLJSON, { name: 'deletePost' })
	deletePost(@Args('input') input: DeletePostInput, @GqlCurrentUser('id') userId:string) {
		return this.postService.delete(input, userId)
	}
}
