import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TagEntity {
	@Field()
	id: string

	@Field()
	name: string
}


@ObjectType()
export class TagCount {
	@Field(() => Int)
	posts:number
}

@ObjectType()
export class TagEntityWithCount extends TagEntity {
	@Field(() => TagCount)
	_count:TagCount
}

