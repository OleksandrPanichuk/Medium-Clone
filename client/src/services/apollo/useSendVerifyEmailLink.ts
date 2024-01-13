import { SEND_VERIFY_EMAIL_LINK } from "@/graphql"
import { VERIFY_EMAIL_LINK_BASE } from "@/shared/config"
import { FetchResult, MutationResult, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { toast } from "sonner"

type ResponseType = {result:string}

type ReturnType = [() => Promise<FetchResult<ResponseType>>, MutationResult<ResponseType>]

export const useSendVerificationLink = (): ReturnType => {
   return  useMutation<ResponseType>(SEND_VERIFY_EMAIL_LINK, {
		onCompleted: () => {
			toast.success('Please, check your email for more details.')
		},
		onError:(error) => {
			toast.error(error.message)
		},
        variables: {
            input: {
                link:VERIFY_EMAIL_LINK_BASE
            }
        }
	})
}