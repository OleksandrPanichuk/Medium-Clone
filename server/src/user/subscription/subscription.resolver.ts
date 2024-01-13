import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SubscriptionService } from "./subscription.service";
import { SubscribeInput } from "./dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthenticatedGuard } from "@/common/guard";
import { GqlCurrentUser } from "@/common/decorators";
import { User } from "@prisma/client";



@UseGuards(GqlAuthenticatedGuard)
@Resolver()
export class SubscriptionResolver {
    constructor(private subscriptionService: SubscriptionService) {}


    @Mutation(() => String)
    subscribeOrManage(@Args('input') input:SubscribeInput, @GqlCurrentUser() user:User) : Promise<string> {
        return this.subscriptionService.subscribeOrManage(input, user)
    }
}