import { PrismaService } from "@/common/prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ResetPasswordInput, SendResetPasswordLinkInput } from "./dto";
import { Redis, TypeRedis, bcrypt, generateErrorResponse } from "@/common/helpers";
import { MailerService } from "@/common/mailer/mailer.service";
import { v4 as uuid } from "uuid";
import { TypeForgetPassword } from "./password.types";


@Injectable()
export class PasswordService {
    private readonly redis: TypeRedis
    constructor(private readonly prisma: PrismaService, private readonly mailer: MailerService) {
        this.redis = Redis.getInstance()
    }


    public async sendResetPasswordLink(input:SendResetPasswordLinkInput) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email:input.email
                }
            })
            if(!user) throw new NotFoundException("We cannot find your email.")

            const code = uuid()

            const link = `${input.link}/${code}`

            await this.redis.set(`forget-password-code:${code}`, JSON.stringify({
                code,
                email:user.email
            }),'EX',1800)

            await this.mailer.sendResetPasswordLink(link, user)

            return 'Please check your email address'
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }


    
    public async verifyResetPasswordCode(code:string) {
        try {   
            const changePasswordString = await this.redis.get(`forget-password-code:${code}`)
            if(!changePasswordString) {
                return false
            }
            return true
        } catch(err) {
            throw generateErrorResponse(err)
        }
    }



    public async resetPassword(input:ResetPasswordInput) {
        try {
            const forgetPasswordString = await this.redis.get(`forget-password-code:${input.code}`)
            if(!forgetPasswordString) throw new BadRequestException('Please, try again')

            const forgetPasswordObject = JSON.parse(forgetPasswordString) as TypeForgetPassword


            const user = await this.prisma.user.findFirst({
                where: {
                    email:forgetPasswordObject.email
                }
            })
            const hash = await bcrypt.hash(input.password)
    
            await this.prisma.user.update({
                where: {
                    id:user.id
                },
                data: {
                    hash
                }
            })

            await this.redis.del(`forget-password-code:${input.code}`)

            return "Password updated"
           } catch (err) {
            throw generateErrorResponse(err)
           }
    }
}