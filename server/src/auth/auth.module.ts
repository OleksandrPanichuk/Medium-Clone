import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserModule } from '@/user/user.module'
import { SessionSerializer } from './utils/session.serializer'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy, GoogleOAuthStrategy, GitHubStrategy } from './strategy'
import { GoogleOAuthGuard } from '@/auth/guard/google.auth.guard'
import { AuthController } from '@/auth/auth.controller'
import { GitHubAuthGuard } from '@/auth/guard/github.auth.guard'
import { AuthProcessor } from './auth.processor'
import { BullModule } from '@nestjs/bull'
import { Queues } from '@/shared/constants'
@Module({
	imports: [UserModule, PassportModule.register({ session: true }), BullModule.registerQueue({
		name:Queues.AUTH
	}),],
	controllers:[AuthController],
	providers: [AuthProcessor,AuthResolver, AuthService,LocalStrategy ,SessionSerializer, GoogleOAuthStrategy, GoogleOAuthGuard, GitHubStrategy, GitHubAuthGuard],
})
export class AuthModule {}
