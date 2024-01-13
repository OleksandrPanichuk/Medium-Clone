import { Module } from "@nestjs/common";
import { EmailResolver } from "./email.resolver";
import { MailerModule } from "@/common/mailer/mailer.module";
import { EmailService } from "./email.service";


@Module({
    imports:[MailerModule],
    providers: [EmailResolver, EmailService]
})
export class EmailModule {}