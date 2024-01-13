import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";
import { Request } from "express";



export const CurrentUser = createParamDecorator(
    async (data: keyof User | undefined, context: ExecutionContext) => {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        const user = req.user as User | undefined


        if (!user) return
        
        if (!data) return user
        
        return user[data]
    }
)