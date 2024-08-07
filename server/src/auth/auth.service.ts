import { bcrypt, generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma/prisma.service'
import {
	Injectable,
	ConflictException,
	NotFoundException,
	BadRequestException,
	ForbiddenException, UnauthorizedException
} from '@nestjs/common'
import { SignInInput, SignInResponse, SignUpInput } from './dto'
import { User } from '@prisma/client'
import { UserEntity } from '@/user/entity/user.entity'
import { DEFAULT_LIST_NAME, Queues} from "@/shared/constants";
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService, @InjectQueue(Queues.AUTH) private readonly authQueue: Queue) {}


	public async signUp(dto: SignUpInput): Promise<UserEntity> {
		try {
			const existingUser = await this.prisma.user.findUnique({
				where: {
					email: dto.email
				}
			})
			if (existingUser?.id)
				throw new ConflictException('User already exist', {
					description: 'auth/user-already-exist'
				})

			const hash = await bcrypt.hash(dto.password)

			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					hash,
					username: dto.username
				}

			})
			//When using bull - uncomment
			// this.authQueue.add(AuthQueue.INITIALIZE_LISTS, {userId:user.id})
			await this.initializeReadingLists(user.id)

			return user
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async signIn(dto: SignInInput): Promise<SignInResponse> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					email: dto.email
				},
				include: {
					subscription:true
				}
			})

			if (!user)
				throw new NotFoundException('User not found', {
					description: 'auth/user-not-found'
				})

			if (!user?.hash)
				throw new BadRequestException('Password is not set', {
					description: 'auth/password-is-not-set-in-database'
				})

			const isPasswordsMatches = await bcrypt.compare(dto.password, user.hash)

			if (!isPasswordsMatches)
				throw new ForbiddenException("Invalid email or password", {
					description: 'auth/invalid-credentials'
				})

			return {...user , subscribed: !!user.subscription}
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async signInWithOAuth(user: User) {
		try {
			if (!user)
				throw new UnauthorizedException('Unauthenticated', {
					description: 'auth/unauthenticated'
				})

			const userExists = await this.prisma.user.findUnique({
				where: {
					email: user.email
				}
			})

			if (!userExists) {
				const newUser = await this.prisma.user.create({
					data: user
				})
				//Uncomment when usign bull
			 	// this.authQueue.add(AuthQueue.INITIALIZE_LISTS, {userId:newUser.id})
				await this.initializeReadingLists(newUser.id)
				return newUser
			}

			return userExists
		} catch (err) {
			throw  generateErrorResponse(err)
		}
	}
	private async initializeReadingLists(userId:string){
		
			const existingList =  await this.prisma.lists.findFirst({
				where: {
					name:DEFAULT_LIST_NAME,
					creatorId:userId
				}
			})
			if(existingList) {
				return 
			}
	
			await this.prisma.lists.create({
				data: {
					name: DEFAULT_LIST_NAME,
					creatorId:userId
				}
			})
		
	}
}
