import { z } from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_BACKEND_URL: z.string().url(),
	NEXT_PUBLIC_APP_URL: z.string().url(),
	NEXT_PUBLIC_GOOGLE_SIGN_IN_URL: z.string().url(),
	NEXT_PUBLIC_GITHUB_SIGN_IN_URL: z.string().url()
})

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
export {}
