import {
	createParamDecorator,
	ExecutionContext
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'




export const GqlCurrentUser = createParamDecorator(
	async (data: keyof User | undefined, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context)
		const user = ctx.getContext().req.user as User | undefined

	
		if (!user) return
		
        if (!data) return user
        
		return user[data]
	}
)
