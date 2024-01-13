import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '@/auth/auth.service'
import { SignInResponse } from '../dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email',
		})
	}

	public async validate(email: string, password: string): Promise<SignInResponse> {
		return await this.authService.signIn({ email, password })
	}
}
