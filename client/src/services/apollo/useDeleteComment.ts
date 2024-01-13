"use client"

import { DELETE_POST_COMMENT } from "@/graphql"
import { useCacheManager } from "@/lib"
import { MutationHookOptions, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"

type ReturnType = [() => void, MutationResult]

export const useDeleteComment = (commentId:string ,options?: MutationHookOptions): ReturnType => {
    const cacheManager = useCacheManager()
    const [deleteComment, state] = useMutation(DELETE_POST_COMMENT, {
        ...options,
        onCompleted: (data) => {
            cacheManager.deleteComment(commentId)
            toast.success('Comment deleted')
            options?.onCompleted?.(data)
        },
        onError: (error) => {
            toast.error(error.message)
            options?.onError?.(error)
        }
    })


    const execute = useCallback(() => {
        deleteComment({
            variables: {
                input: {
                    commentId
                }
            }
        })
    }, [deleteComment, commentId])

    return [execute, state]
}