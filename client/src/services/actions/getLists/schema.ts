import { z } from 'zod'

export const variablesSchema = z.object({
	creatorId: z.string().optional(),
	take: z.number().positive().optional(),
	skip: z.number().positive().optional()
})