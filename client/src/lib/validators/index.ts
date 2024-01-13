import {
	MAX_LIST_DESCRIPTION_LENGTH,
	MAX_LIST_NAME_LENGTH
} from '@/shared/config'
import { z } from 'zod'

export const signInSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password is too short')
})

export const signUpSchema = signInSchema.merge(
	z.object({
		username: z.string().min(1, 'Username is too short')
	})
)

export const aboutUserSchema = z.object({
	about: z.string().max(2500, {
		message: 'Provided info is too long'
	})
})

export const editProfileSchema = z.object({
	about: z
		.string()
		.max(2500, {
			message: 'Provided info is too long'
		})
		.optional(),
	username: z.string().max(25, { message: 'Username is too long' }).optional()
})

export const listDescriptionSchema = z.object({
	note: z.string().max(200, {
		message: 'Provided description is too long'
	})
})

export const updateListSchema = z.object({
	description: z
		.string()
		.max(MAX_LIST_DESCRIPTION_LENGTH, { message: 'Provided value is too long' })
		.optional(),
	name: z
		.string()
		.min(1, { message: 'List name is too short' })
		.max(MAX_LIST_NAME_LENGTH, 'List name is too long')
		.optional(),
	public: z.boolean().optional()
})

export const createListSchema = z.object({
	description: z
		.string()
		.max(MAX_LIST_DESCRIPTION_LENGTH, {
			message: 'Provided value is too long'
		})
		.optional(),
	name: z
		.string()
		.min(1, { message: 'List name is too short' })
		.max(MAX_LIST_NAME_LENGTH, 'List name is too long'),
	public: z.boolean()
})


export const emailSchema = z.object({
	email: z.string().email('Invalid email address')
})

export const forgotPasswordSchema = z.object({
	password: z.string().min(8, {message:'Password is too short'}),
	confirmPassword : z.string().min(8, {message:"Confirm password is too short"})
})