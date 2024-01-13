import { ConfigService } from "@nestjs/config";
import {MailerOptions} from '@nestjs-modules/mailer'
import {EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'


export const getMailerConfig = async (config: ConfigService): Promise<MailerOptions> => {
    return {
        transport:config.get<string>("MAIL_TRANSPORT"),
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