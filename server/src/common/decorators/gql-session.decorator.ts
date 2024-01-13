import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'
import { Session } from 'express-session'

export const GqlSession = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req as Request
		return request.session as Session
	}
)
