import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'


@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private config: ConfigService) {
		super({
			clientID:config.get<string>("GOOGLE_CLIENT_ID"),
			clientSecret:config.get<string>("GOOGLE_CLIENT_SECRET"),
			callbackURL:`${config.get<string>('CLIENT_URL')}/api/auth/callback/google`,
			scope:['email', 'profile']
		})
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const {emails, photos, displayName } = profile
		

		const user : Partial<User> = {
			email: emails[0].value,
			username: displayName,
			verified:true,
			avatar: {
				url: photos[0].value,
				key:undefined
			}
		}
		done(null ,user)
	}
}