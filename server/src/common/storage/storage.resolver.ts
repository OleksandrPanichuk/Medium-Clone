import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { StorageService } from './storage.service'
import { File, TypeFileUpload } from '@/shared/types'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { GqlAuthenticatedGuard } from '../guard'
import { UseGuards } from '@nestjs/common'

@UseGuards(GqlAuthenticatedGuard)
@Resolver()
export class StorageResolver {
	constructor(private storageService: StorageService) {}

	@Mutation(() => File, { name: 'uploadFile' })
	uploadFile(@Args('file', { type: () => GraphQLUpload }) file: TypeFileUpload) {
		
		return this.storageService.uploadFile( file)
	}

	@Mutation(() => String, { name: 'deleteFile' })
	async deleteFile(@Args('key') key: string) {
		await this.storageService.deleteFile(key)

		return  'File deleted'
		
	}
}
