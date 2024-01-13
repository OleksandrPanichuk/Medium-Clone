import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostClap } from "./claps.entity";
import { FindPostClapsInput, TogglePostClapsInput, TogglePostClapsResponse } from "./dto";
import { GqlAuthenticatedGuard } from "@/common/guard";
import { UseGuards } from "@nestjs/common";
import { ClapsService } from "./claps.service";
import { GqlCurrentUser } from "@/common/decorators";


@Resolver()
export class ClapsResolver {
    constructor(private readonly clapsService:ClapsService) {}

    @Query(() => [PostClap], {name:"findPostClaps"})
	findPostClaps(@Args("input") input:FindPostClapsInput) {
		return this.clapsService.findPostClaps(input)
	}

    @UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => TogglePostClapsResponse, {name:"togglePostClaps"})
	togglePostClaps(@Args('input') input: TogglePostClapsInput, @GqlCurrentUser('verified') verified:boolean ) {
		return this.clapsService.toggleClaps(input, verified)
	}
}