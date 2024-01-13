import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { SubscriptionModule } from './subscription/subscription.module';
import { EmailModule } from './email/email.module';
import { PasswordModule } from './password/password.module';

@Module({
	providers: [UserResolver, UserService],
	exports: [UserService],
	imports: [SubscriptionModule, EmailModule, PasswordModule]
})
export class UserModule {}
