import { Controller, Get, Req, Res, UseGuards, Session } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { GoogleOAuthGuard } from '@/auth/guard/google.auth.guard'
import { GitHubAuthGuard } from '@/auth/guard/github.auth.guard'


@Controller('auth')
export class AuthController {
	private  CLIENT_URL: string
	constructor(private  readonly  authService: AuthService, private  config: ConfigService) {
		this.CLIENT_URL = config.get<string>("CLIENT_URL")
	}

	@Get('sign-in/google')
	@UseGuards(GoogleOAuthGuard)
	signInWithGoogle() {}

	@Get('sign-in/github')
	@UseGuards(GitHubAuthGuard)
	signInWithGitHub() {}


	@Get('callback/google')
	@UseGuards(GoogleOAuthGuard)
	async googleAuthCallback(
		@Req() req: Request,
		@Session() session,
		@Res() res: Response
	) {
		try {
			const user = await this.authService.signInWithOAuth(req?.user as User)
			session.passport = { user: user.id }
			return res.redirect(this.CLIENT_URL)
		} catch (err) {
			return res.redirect(`${this.CLIENT_URL}?error=true`)
		}
	}

	@Get('callback/github')
	@UseGuards(GitHubAuthGuard)
	async githubCallback(
		@Session() session,
		@Req() req: Request,
		@Res() res: Response
	) {
		try {
			const user = await this.authService.signInWithOAuth(req?.user as User)
			session.passport = { user: user.id }
			return res.redirect(this.CLIENT_URL)
		} catch (err) {
			return res.redirect(`${this.CLIENT_URL}?error=true`)
		}
	}
}