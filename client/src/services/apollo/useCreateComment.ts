import { CREATE_POST_COMMENT } from "@/graphql"
import type { TypeCreatePostCommentResponse } from "@/shared/types"
import { useMutation } from "@apollo/client"
import { toast } from "sonner"


export const useCreateComment = () => {
    return useMutation<TypeCreatePostCommentResponse>(CREATE_POST_COMMENT,{
        onError:(error) => {
            toast.error(error.message)
        }
    })
}