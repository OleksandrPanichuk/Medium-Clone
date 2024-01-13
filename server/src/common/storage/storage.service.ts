import { Injectable, InternalServerErrorException } from '@nestjs/common'
import {
	uploadBytes,
	getDownloadURL,
	ref,
	deleteObject
} from 'firebase/storage'
import { Firebase } from '@/common/helpers'
import { FirebaseStorage } from 'firebase/storage'
import { File, TypeFileUpload } from '@/shared/types'
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer'

@Injectable()
export class StorageService {
	private storage: FirebaseStorage
	constructor() {
		this.storage = Firebase.getStorage()
	}

	public async uploadFile(file: TypeFileUpload): Promise<File> {
		try {
			const fileArray = file.filename.split('.')

			const fileExtension = fileArray[fileArray.length - 1]

			const fileName =
				file.filename.replace(' ', '') +
				Date.now() +
				`.${fileExtension}`

			const storageRef = ref(this.storage, fileName)

			const buffer = await streamToBuffer(file.createReadStream())

			await uploadBytes(storageRef, buffer)

			const url = await getDownloadURL(storageRef)

			return {
				url,
				key: fileName
			}
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException('Something went wrong')
		}
	}

	public async deleteFile(fileName: string) {
		try {
			console.log(fileName)
			const storageRef = ref(this.storage, fileName)
			await deleteObject(storageRef)
		} catch (err) {
			throw new InternalServerErrorException('Failed to delete a file')
		}
	}
}
