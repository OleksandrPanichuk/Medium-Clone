"use client"

import { useAuth } from "@/components/providers"
import { UPDATE_USER_AVATAR } from "@/graphql"
import type { TypeUpdateAvatarResponse } from "@/shared/types"
import { FetchResult, MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"

type ResponseType = { user: TypeUpdateAvatarResponse }
type ReturnType = [(file: File) => Promise<FetchResult<ResponseType>>, MutationResult<ResponseType>]

export const useUpdateAvatar = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const {setUser} = useAuth()
    const [updateAvatar, state] = useMutation<ResponseType>(UPDATE_USER_AVATAR, {
        ...options ,
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        },
        onCompleted:(data) => {
            setUser((prev) => ({ ...prev!, ...data.user.avatar }))
            options?.onCompleted?.(data)
        }
    })   
    const execute = useCallback((file:File) => updateAvatar({variables:{file}}), [updateAvatar])

    return [execute, state]
}