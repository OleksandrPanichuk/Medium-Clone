import { ADD_POST_TO_LIST } from "@/graphql";
import { MutationHookOptions, MutationResult, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";

const variablesSchema = z.object({
    listId: z.string({required_error:'Invalid data'}),
    postId: z.string({required_error:'Invalid data'}),
})


type InputType = z.infer<typeof variablesSchema>


type ResponseType = {
    result: {
        message:string
    }
}

type ReturnType = [(input:InputType) => Promise<void>, MutationResult<ResponseType>]


export const useAddPostToList = (options?:MutationHookOptions<ResponseType>): ReturnType => {
    const [addPostToList, state] = useMutation<ResponseType>(ADD_POST_TO_LIST, {
        ...options ,
        onError:(error) => {
            toast.error(error.message)
            options?.onError?.(error)
        }
    });

    const execute = useCallback(async (input:InputType) => {
        const parsedInput = variablesSchema.safeParse(input)
        if(parsedInput.success) {
            addPostToList({
                variables: {
                    input: parsedInput.data
                }
            })
        } else {
            toast.error(parsedInput.error.message)
        }
    }, [addPostToList])


    return [execute, state]

}