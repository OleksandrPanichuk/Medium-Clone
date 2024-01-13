"use client"

import { UPDATE_NOTE } from "@/graphql"
import { listDescriptionSchema } from "@/lib"
import { MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"
import { z } from "zod"

const variablesSchema = listDescriptionSchema.merge(z.object({
    listId: z.string({required_error:"Invalid data"}),
    postId: z.string({required_error:"Invalid data"})
}))

type ResponseType = {
   post: {
    note?:string
   }
}

type InputType = z.infer<typeof variablesSchema>

type ReturnType = [(input:InputType) => Promise<void>, MutationResult<ResponseType>]

export const useUpdateNote = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const [updateNote, state] = useMutation<ResponseType>(UPDATE_NOTE, {
        ...options ,
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        }
    })


    const execute = useCallback(async (input:InputType) => {
        const parsedInput = variablesSchema.safeParse(input)
        if(parsedInput.success) {
            updateNote({
                variables: {
                    input: parsedInput.data
                }
            })
        } else {
            toast.error(parsedInput.error.message)
        }
    }, [updateNote])

    return [execute, state]
}