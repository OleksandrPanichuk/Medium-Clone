"use client"

import { CREATE_LIST } from "@/graphql"
import { TypeCreateListResponse } from "@/shared/types"
import { MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { createListSchema } from '@/lib'
import { z } from "zod"
import { useCallback } from "react"
import { toast } from "sonner"


const variablesSchema = createListSchema

type InputType = z.infer<typeof variablesSchema>

type ResponseType = {list: TypeCreateListResponse}

type ReturnType = [(input: InputType) => void,  MutationResult<ResponseType>]

export const useCreateList = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const [createList, state] = useMutation<ResponseType>(CREATE_LIST, {
        ...options ,
        onError: (error) => {   
            toast.error(error.message)
            options?.onError?.(error)
        }
    })

    const execute = useCallback((input:InputType) => {
       
            const parsedInput = variablesSchema.safeParse(input)
           
               if(parsedInput.success) {
                createList({
                    variables: {
                        input:parsedInput.data
                    },
                })
               } else {
                toast.error(parsedInput.error.message)
               }
        
    }, [createList])

    return [execute, state]
}