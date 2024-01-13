import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PasswordService } from "./password.service";
import {  ResetPasswordInput, SendResetPasswordLinkInput } from "./dto";


@Resolver()
export class PasswordResolver {
    constructor(private readonly passwordService: PasswordService) {}

    @Query(() => Boolean)
    verifyResetPasswordCode(@Args('code') code:string) {
        return this.passwordService.verifyResetPasswordCode(code)
    }

    @Mutation(() => String)
    sendResetPasswordLink(@Args('input') input:SendResetPasswordLinkInput) {
        return this.passwordService.sendResetPasswordLink(input)
    }


    @Mutation(() => String)
    resetPassword(@Args('input') input: ResetPasswordInput) {
        return this.passwordService.resetPassword(input)
    }

    
}