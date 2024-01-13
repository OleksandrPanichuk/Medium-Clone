import { z } from 'zod'
import { variablesSchema } from '@/services/actions/getLists/schema'
import { TypeFindManyList } from '@/shared/types'


export type InputType = {
	query: z.infer<typeof variablesSchema>
}
export type ReturnType = TypeFindManyList[] | undefined
