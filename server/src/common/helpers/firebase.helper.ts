import { FirebaseApp, initializeApp, FirebaseOptions } from 'firebase/app'
import { FirebaseStorage, getStorage } from 'firebase/storage'

export class Firebase {
	private static instance: FirebaseApp
	private static storage: FirebaseStorage

	public static getInstance(): FirebaseApp {
		if (this.instance) {
			return this.instance
		}

		const config: FirebaseOptions = {
			apiKey: process.env.FIREBASE_API_KEY,
			appId: process.env.FIREBASE_APP_ID,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET
		}

		this.instance = initializeApp(config)
		return this.instance
	}

	public static getStorage(): FirebaseStorage {
		if (this.storage) {
			return this.storage
		}
		if (!this.instance) {
			this.getInstance()
		}
		this.storage = getStorage(this.instance)
		return this.storage
	}

}
