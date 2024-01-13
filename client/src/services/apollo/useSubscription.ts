import { SUBSCRIBE_OR_MANAGE } from "@/graphql"
import { DEFAULT_REDIRECT_URL } from "@/shared/config"
import { MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"
import { z } from "zod"

type ResponseType = {url:string}

type ReturnType = [(redirectUrl?:string) => void, MutationResult<ResponseType>]

export const useSubscription = (): ReturnType => {
    const [subscribeOrManage, state] = useMutation<ResponseType>(SUBSCRIBE_OR_MANAGE,{
        onCompleted: (data) => {
            window.location.href = data.url
        },
        onError: (error) => {
            console.log(error)
            toast.error('Something went wrong. Please try later')
        }
    })


    const execute = useCallback((redirectUrl:string = DEFAULT_REDIRECT_URL) => {
        const parsedUrl = z.string().url({message:'Redirect link is not valid url'}).safeParse(redirectUrl)
        if(parsedUrl.success) {
            subscribeOrManage({
                variables: {
                    input : {
                        redirectUrl
                    }
                }
            })
        } else {
            toast.error(parsedUrl.error.message)
        }
    },[subscribeOrManage])

    return [execute, state]
}