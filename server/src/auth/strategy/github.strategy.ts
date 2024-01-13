import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly config: ConfigService) {
		super({
			clientID: config.get<string>('GITHUB_CLIENT_ID'),
			clientSecret: config.get<string>('GITHUB_CLIENT_SECRET'),
			callbackURL: `${config.get<string>('URL')}/api/auth/callback/github`,
			scope: ['user:email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	) {
		const { emails, photos, username } = profile

		//Формуємо дані про нашого користувача, які попадуть в req.user, після чого ми його додамо в базу даних(дивись auth.controller.ts: google/callback)
		const user: Partial<User> = {
			username,
			email: emails[0].value,
			verified:true,
			avatar: {
				url: photos[0].value,
				key:undefined
			}
		}
		done(null, user)
	}
}