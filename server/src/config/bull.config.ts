import {BullModuleOptions} from '@nestjs/bull'

export const bullConfig: BullModuleOptions = {
    url:process.env.QUEUE_REDIS_URL,
	defaultJobOptions: {
		removeOnComplete:true,
		removeOnFail:true,
		attempts:1,

	},
	limiter: {
		duration:20000,
        max:100,
	},
	prefix: 'podium'
}