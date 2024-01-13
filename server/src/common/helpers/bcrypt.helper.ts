import * as rootBcrypt from 'bcrypt'

class Bcrypt {
	public async hash(data: string): Promise<string> {
		const salt = await rootBcrypt.genSalt(10)
		const hash = await rootBcrypt.hash(data, salt)
		return hash
	}

	public async compare(data: string, hash: string): Promise<boolean> {
		return await rootBcrypt.compare(data, hash)
	}
}

export const bcrypt = new Bcrypt()
