import { Redis, TypeRedis, generateErrorResponse } from "@/common/helpers";
import { MailerService } from "@/common/mailer/mailer.service";
import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";
import { SendVerificationLinkInput } from "./dto";
import {v4 as uuid} from 'uuid'
import { VerifyEmailInput } from "./dto/verify.dto";
import { TypeEmailVerificationCode } from "./email.types";
import { UserEntity } from "@/user/entity/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { User } from "@prisma/client";


@Injectable()
export class EmailService {
    private readonly redis: TypeRedis
    constructor(private readonly prisma: PrismaService, private readonly mailer:MailerService, @Inject(CACHE_MANAGER) private cacheManager:Cache) {
        this.redis = Redis.getInstance()
    }


    public async sendVerificationLink(input:SendVerificationLinkInput,user:User) {
        try {   
            const verificationId = uuid()
            const link = `${input.link}/${verificationId}`

            
            await this.redis.set(`verification-code:${verificationId}`, JSON.stringify({
                userId:user.id,
                code:verificationId
            }),'EX',300)
            await this.mailer.sendConfirmEmailLink(link, user)
            
            return 'Please check your email address'
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }


    public async verify(input:VerifyEmailInput, userId:string): Promise<UserEntity> {
        try {
            const verificationString = await this.redis.get(`verification-code:${input.code}`)

            if(!verificationString) {
                throw new BadRequestException('No available links to verify your email. Please try again')
            }
            const verificationObject = JSON.parse(verificationString) as TypeEmailVerificationCode

            if(userId !== verificationObject.userId) {
                throw new BadRequestException('You are trying to verify a different account. Please log in to the account you are trying to verify')
            }

            const user = await this.prisma.user.findUnique({
                where: {
                    id:verificationObject.userId
                }
            })

            if(!user) throw new NotFoundException("User not found")

            const updatedUser = await this.prisma.user.update({
                where: {
                    id:user.id
                },
                data: {
                    verified:true
                }
            })

            await this.redis.del(`verification-code:${input.code}`)


            const cachedUser = await this.cacheManager.get<UserEntity>(`user:${user.id}`)
            if(cachedUser) {
                cachedUser.verified = updatedUser.verified
                await this.cacheManager.set(`user:${user.id}`, cachedUser)
            }


            return updatedUser
            
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }
}