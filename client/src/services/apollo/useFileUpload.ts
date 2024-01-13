"use client"
import { UPLOAD_FILE } from '@/graphql'
import { TypeFile } from '@/shared/types'
import {useMutation, MutationHookOptions, MutationResult, FetchResult} from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'sonner'

type ResponseType = { file: TypeFile }

type ReturnType = [(file:File) => Promise<FetchResult<ResponseType>>, MutationResult<ResponseType>]

export const useFileUpload = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const [uploadFile, state] = useMutation<ResponseType>(UPLOAD_FILE, {
        ...options,
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        }
    })

    const execute = useCallback( (file:File) => 
      
             uploadFile({
                variables: {
                    file
                }
            })
    
    ,[uploadFile])

    return [execute, state]
}