import { UserEntityWithoutUnusedData } from "@/user/entity/user.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ListEntity {
    @Field(() => ID)
    id:string 

    @Field()
    creatorId:string

    @Field()
    name:string
    
    @Field(() => Boolean)
    public:boolean

    @Field({nullable:true})
    description?:string

    @Field(() => Date)
    createdAt: Date
}


@ObjectType()
export class ListEntityWithCreator extends ListEntity {
    @Field(() => UserEntityWithoutUnusedData)
    creator:UserEntityWithoutUnusedData
}

@ObjectType()
 class ListCount {
    @Field(() => Int)
    posts:number
 }

@ObjectType()
export class  ListEntityWithCreatorWithCount extends ListEntityWithCreator {
    @Field(() => ListCount)
    _count: ListCount
}


@ObjectType()
export class ListForPostEntity {
    @Field()
    listId: string 

    @Field(() => ID)
    id:string

    @Field()
    postId:string

    @Field({nullable:true})
    note?:string
}