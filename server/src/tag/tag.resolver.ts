import { Args, Query, Resolver } from '@nestjs/graphql'
import { TagService } from './tag.service'
import { FindManyTagsQuery, FindTagByNameInput } from './dto'
import { TagEntityWithCount } from './tag.entity'

@Resolver()
export class TagResolver {
	constructor(private readonly tagService: TagService) {}

	@Query(() => [TagEntityWithCount])
	findManyTags(@Args('query', { nullable: true, type:() => FindManyTagsQuery }) query?: FindManyTagsQuery) {
		return this.tagService.findMany(query)
	}

	@Query(() => TagEntityWithCount, {nullable:true})
	findTagByName(@Args('input', {type:() => FindTagByNameInput}) input:FindTagByNameInput) {
		return this.tagService.findByName(input)
	}
}
