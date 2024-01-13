import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmailService } from "./email.service";
import { SendVerificationLinkInput } from "./dto";
import { UserEntity } from "@/user/entity/user.entity";
import { VerifyEmailInput } from "./dto/verify.dto";
import { GqlCurrentUser } from "@/common/decorators";
import { UseGuards } from "@nestjs/common";
import { GqlAuthenticatedGuard } from "@/common/guard";
import { User } from "@prisma/client";



@UseGuards(GqlAuthenticatedGuard)
@Resolver()
export class EmailResolver {

    constructor(private readonly emailService:EmailService) {}

    @Mutation(() => String)
    sendVerificationLink(@Args('input') input:SendVerificationLinkInput, @GqlCurrentUser() user:User) {
        return this.emailService.sendVerificationLink(input,user)
    }


    @Query(() => UserEntity)
    verifyEmail(@Args('input') input:VerifyEmailInput,@GqlCurrentUser('id') userId:string) {
        return this.emailService.verify(input, userId)
    }
}