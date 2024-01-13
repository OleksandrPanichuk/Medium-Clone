
import {Injectable} from '@nestjs/common'
import {MailerService as MailerServicePrimary} from '@nestjs-modules/mailer'
import { User } from '@prisma/client'
import { join } from 'path'

@Injectable()
export class MailerService {
    constructor(private readonly mailer:MailerServicePrimary) {}


    public async sendConfirmEmailLink(link:string, user: User) {
        return await this.mailer.sendMail({
            template: join(__dirname, '/templates/verify-email.template.ejs'),
            context: {
                link,
                username:user.username
            },
            sender : 'noreply@gmail.com',
            to:user.email,
            from:'noreply@gmail.com',
            
            subject:'Confirm email address | Podium'
        })
    }


    public async sendResetPasswordLink(link:string, user:User) {
        return await this.mailer.sendMail({
            template: join(__dirname, '/templates/change-password.template.ejs'),
            context: {
                link,
                username: user.username,
            },
            sender : 'noreply@gmail.com',
            to:user.email,
            from:'noreply@gmail.com',
            subject:'Change password | Podium'
        })
    }
}