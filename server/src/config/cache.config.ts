import {CacheModuleOptions} from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfig: CacheModuleOptions = {
    isGlobal:true,
	store:redisStore,
	ttl:7200,
	url: process.env.REDIS_URL		
}