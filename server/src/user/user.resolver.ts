import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserEntity } from './entity/user.entity'
import { FindUserByIdInput, SearchUsersQuery, SearchUsersResponse, UpdateUserInput } from './dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthenticatedGuard } from '@/common/guard'
import { GqlCurrentUser } from '@/common/decorators'
import { User } from '@prisma/client'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { TypeFileUpload } from '@/shared/types'
import { CurrentUserResponse } from './dto/current-user.dto'
import { SubscriptionService } from './subscription/subscription.service'



@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService, private readonly subscriptionService:SubscriptionService) {}


	@Query(() => [SearchUsersResponse], {name:'searchUsers'})
	searchUsers(@Args('query') query:SearchUsersQuery, @GqlCurrentUser() user?:User) {
		return this.userService.search(query, user?.id)
	}

	@Query(() => UserEntity, { name: 'findUserById' })
	findUserById(@Args('input') input: FindUserByIdInput) {
		return this.userService.findById(input.userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Query(() => Int)
	getUserPostsCount(@GqlCurrentUser('id') userId:string) : Promise<number> {
		return this.userService.getPostsCount(userId)
	}
	
	@UseGuards(GqlAuthenticatedGuard)
	@Query(() => CurrentUserResponse, { name: 'currentUser' })
	async currentUser(@GqlCurrentUser() user: User): Promise<CurrentUserResponse> {
		const subscribed = await this.subscriptionService.checkSubscription(user.id)
		return {...user, subscribed}
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => UserEntity, { name: 'updateUser' })
	updateUser(
		@Args('input') input: UpdateUserInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.userService.update(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => UserEntity, { name: 'updateUserAvatar' })
	updateUserAvatar(
		@Args({ name: 'file', type: () => GraphQLUpload }) file: TypeFileUpload,
		@GqlCurrentUser('id') userId: string
	) {
		return this.userService.updateAvatar(file, userId)
	}
}
