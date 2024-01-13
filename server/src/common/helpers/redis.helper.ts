import { Redis as RedisPrimary } from 'ioredis'

export type TypeRedis =  RedisPrimary
export class Redis {
	private static instance: RedisPrimary

	public static getInstance(): RedisPrimary {
		if (this.instance) {
			return this.instance
		}
		const redisUrl = process.env.REDIS_URL

		this.instance = new RedisPrimary(redisUrl)

		this.instance.on("connecting", () => console.log("REDIS CONNECTED"))

		this.instance.on('error', (err) => console.log(err))

		return this.instance
	}
}
