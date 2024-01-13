import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserEntity } from '@/user/entity/user.entity'
import { SignInInput, SignInResponse, SignUpInput } from './dto'
import { GqlAuthenticatedGuard } from '@/common/guard'
import { GqlSession } from '@/common/decorators'
import { Session } from 'express-session'
import { GraphQLJSON } from 'graphql-type-json'


@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => UserEntity, { name: 'signUp' })
	async signUp(@Args('input') input: SignUpInput, @GqlSession() session) {
		const user = await this.authService.signUp(input)
		session.passport = { user: user.id }
		return user
	}



	@Mutation(() => SignInResponse, { name: 'signIn' })
	async signIn(@Args('input') input: SignInInput, @GqlSession() session) :Promise<SignInResponse> {
		const user = await this.authService.signIn(input)
		session.passport = { user: user.id }
		return user
	}

	@UseGuards(GqlAuthenticatedGuard)
	@Mutation(() => GraphQLJSON, { name: 'signOut' })
	signOut(@GqlSession() session: Session) {
		session.destroy((err) => {
			return err
		})
		return { message: 'You are successfully sign out' }
	}
}
