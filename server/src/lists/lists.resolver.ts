import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
	AddPostToListInput,
	AddPostToListResponse,
	CreateListInput,
	DeleteListInput,
	FindListByIdInput,
	FindListPostsInput,
	FindListPostsResponse,
	FindManyListsInput,
	FindManyListsResponse,
	RemovePostFromListInput,
	RemovePostFromListResponse,
	UpdateListInput,
	UpdateNoteInput
} from './dto'
import { ListsService } from './lists.service'
import {
	ListEntityWithCreatorWithCount,
	ListForPostEntity
} from './list.entity'
import { GqlCurrentUser } from '@/common/decorators'
import { UseGuards } from '@nestjs/common'
import { GqlAuthenticatedGuard } from '@/common/guard'

@Resolver()
export class ListsResolver {
	constructor(private readonly listsService: ListsService) {}

	@Query(() => [FindManyListsResponse])
	findManyLists(
		@Args('query') query: FindManyListsInput,
		@GqlCurrentUser('id') userId?: string
	) {
		return this.listsService.findMany(query, userId)
	}

	@Query(() => ListEntityWithCreatorWithCount)
	findListById(
		@Args('input') input: FindListByIdInput,
		@GqlCurrentUser('id') userId?: string
	) {
		return this.listsService.findById(input, userId)
	}

	@Query(() => [FindListPostsResponse])
	findListPosts(
		@Args('input') input: FindListPostsInput,
		@GqlCurrentUser('id') userId?: string
	) {
		return this.listsService.findListPosts(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => ListEntityWithCreatorWithCount)
	createList(
		@Args('input') input: CreateListInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.create(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => ListEntityWithCreatorWithCount)
	updateList(
		@Args('input') input: UpdateListInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.update(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => AddPostToListResponse)
	addPostToList(
		@Args('input') input: AddPostToListInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.addPostToList(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => RemovePostFromListResponse)
	removePostFromList(
		@Args('input') input: RemovePostFromListInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.removePostFromList(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => ListForPostEntity)
	updateNote(
		@Args('input') input: UpdateNoteInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.updateNote(input, userId)
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => String)
	deleteList(
		@Args('input') input: DeleteListInput,
		@GqlCurrentUser('id') userId: string
	) {
		return this.listsService.delete(input, userId)
	}
}
