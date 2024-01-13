import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UserService } from '@/user/user.service'
import { User } from '@prisma/client'
import { UserEntity } from '@/user/entity/user.entity'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UserService) {
		super()
	}

	serializeUser(user: User, done: (err: unknown, userId: string) => void) {
		try {
			done(null, user?.id)
		} catch (err) {
			done(err, null)
		}
	}

	async deserializeUser(
		userId: string,
		done: (err: unknown, user: UserEntity) => void
	) {
		try {
			const user = await this.userService.findById(userId)
			done(null, user)
		} catch (err) {
			done(err, null)
		}
	}
}
