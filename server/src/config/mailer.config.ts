import { MailerOptions } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { ConfigService } from "@nestjs/config"


export const getMailerConfig = async (config: ConfigService): Promise<MailerOptions> => {
    return {
        transport: {
            host: config.get('MAIL_HOST'),
            port: config.get<number>("MAIL_PORT"),
            from: config.get('MAIL_FROM'),
            auth: {
                user: config.get('MAIL_USER'),
                pass: config.get('MAIL_PASSWORD')
            }
        },
        defaults: {
            from:'noreply@gmail.com',
        },
        template: {
            adapter: new  EjsAdapter(),
            options: {
                strict:false
            }
        }
    }
}