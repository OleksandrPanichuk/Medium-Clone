import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

@Injectable()
export class GqlAuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		const req = ctx.getContext().req as Request
		return req.isAuthenticated()
	}
}


@Injectable()
export class AuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const ctx = context.switchToHttp()
		const req = ctx.getRequest<Request>()
		return req.isAuthenticated()
	}
}