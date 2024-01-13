import { Module } from "@nestjs/common";
import { PasswordResolver } from "./password.resolver";
import { PasswordService } from "./password.service";
import { MailerModule } from "@/common/mailer/mailer.module";



@Module({
    imports: [MailerModule],
    providers: [PasswordResolver, PasswordService]
})
export class PasswordModule {} 