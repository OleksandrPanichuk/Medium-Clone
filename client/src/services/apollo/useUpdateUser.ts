"use client"

import { useAuth } from "@/components/providers"
import { UPDATE_USER } from "@/graphql"
import { editProfileSchema } from "@/lib"
import type { TypeUser } from "@/shared/types"
import { FetchResult, MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"
import { z } from "zod"

const variablesSchema = editProfileSchema

type InputType =z.infer<typeof variablesSchema>

type ResponseType = { user: TypeUser }

type ReturnType = [(input: InputType) => Promise<FetchResult<ResponseType> | undefined>, MutationResult<ResponseType>]

export const useUpdateUser = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const {setUser} = useAuth()

    const [updateUser, state] = useMutation<ResponseType>(UPDATE_USER, {
        ...options ,
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        },
        onCompleted:(data) => {
            toast.success('Profile successfully updated')
            setUser((prev) => ({ ...data.user,verified:prev?.verified ?? false, subscribed: prev?.subscribed ?? false }))

            options?.onCompleted?.(data)
        }
    })

    const execute = useCallback(async (input:InputType) => {
        const parsedInput = variablesSchema.safeParse(input);

        if(parsedInput.success) {
            return   updateUser({
                variables: {
                    input:parsedInput.data
                }
            })
        } else {
            toast.error(parsedInput.error.message) 
        }
    }, [updateUser])

    return [execute, state]
}