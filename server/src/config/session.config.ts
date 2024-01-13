import { SessionOptions } from 'express-session'
import RedisStore from 'connect-redis'
import { Redis } from '@/common/helpers'

export const SESSION_NAME = 'podium:session'

const redis = Redis.getInstance()

export const sessionConfig: SessionOptions = {
	name: SESSION_NAME,
	store: new RedisStore({
		client: redis,
		ttl: 60 * 60 * 24 * 7
	}),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,	
	}
}
