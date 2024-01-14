"use client"

import { UPDATE_LIST } from "@/graphql"
import { updateListSchema, useCacheManager } from "@/lib"
import { TypeListExtended } from "@/shared/types"
import { useListsStore } from "@/store"
import { MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"
import { z } from "zod"

const variablesSchema = updateListSchema.merge(z.object({
	listId: z.string({ required_error: 'Invalid data' })
}))


type InputType = z.infer<typeof variablesSchema>

type ResponseType = {
    list: Omit<TypeListExtended, 'createdAt'>
}

type ReturnType = [(input: InputType) => Promise<void>, MutationResult<ResponseType>]

export const useUpdateList = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const cacheManager = useCacheManager()
    const {changeListData} = useListsStore()
    
    const [updateList, state] = useMutation<ResponseType>(UPDATE_LIST, {
        ...options, 
        onCompleted: (data) => {
            const {list} = data
            toast.success('List successfully updated')

			changeListData(list.id,  list)
			cacheManager.modifyList(list.id, list)

            options?.onCompleted?.(data)
        },
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        }
    })

    const execute = useCallback(async (input:InputType) => {
        const parsedInput = variablesSchema.safeParse(input)
        if(parsedInput.success) {
            updateList({
                variables: {
                    input:parsedInput.data
                }
            })
        } else {
            toast.error(parsedInput.error.message)
        }
    }, [updateList])

    return [execute, state]
}