import { z } from "zod";

export const variablesSchema = z.object({
    take: z.number().positive().optional(),
    tag: z.string().optional(),
    creatorId: z.string().optional(),
    sortBy: z.string().optional()
})
