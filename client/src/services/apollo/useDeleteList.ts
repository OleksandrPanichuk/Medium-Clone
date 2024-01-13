"use client"

import { DELETE_LIST } from "@/graphql"
import { useCacheManager } from "@/lib"
import { useListsStore } from "@/store"
import { FetchResult, MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { toast } from "sonner"

type ResponseType = { message: string }

type ReturnType = [() => Promise<FetchResult<ResponseType>>, MutationResult<ResponseType>]

export const useDeleteList = (listId:string ,options?:MutationHookOptions<ResponseType>): ReturnType => {
    const cacheManager = useCacheManager()
    const {removeList} = useListsStore()
    
    const [deleteList, state] = useMutation<ResponseType>(DELETE_LIST, {
        ...options, 
        variables: {
            input: {
                listId
            }
        },
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        },
        onCompleted: (data) => {
            toast.success(data.message)
            cacheManager.deleteList(listId)
            removeList(listId)
            options?.onCompleted?.(data)
        }
    })

    return [deleteList, state]
}