import { Global, Module } from '@nestjs/common'
import { StorageService } from './storage.service'
import { StorageResolver } from './storage.resolver'

@Global()
@Module({
	providers: [StorageService, StorageResolver],
	exports: [StorageService]
})
export class StorageModule {}
