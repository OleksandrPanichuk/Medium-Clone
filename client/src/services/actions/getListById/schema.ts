import {z} from 'zod'


export const variablesSchema = z.object({
    listId: z.string(),
    take: z.number().positive()
})