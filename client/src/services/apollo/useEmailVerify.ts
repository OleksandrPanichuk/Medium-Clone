import { useAuth } from "@/components/providers"
import { VERIFY_EMAIL } from "@/graphql"
import { Routes } from "@/shared/constants"
import {  useQuery, QueryResult } from "@apollo/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"



type ResponseType = {
    user: {
        verified: boolean
    }
}


type ReturnType = QueryResult<ResponseType>


export const useEmailVerify = (code:string): ReturnType => {
    const router = useRouter()
    const {setUser} = useAuth()
    return useQuery<ResponseType>(VERIFY_EMAIL, {
        onCompleted:(data) => {
            if(data.user.verified) {
                toast.success("Verification was successful")
                setUser(prev => prev &&  ({...prev, ...data.user}))
                router.push(Routes.ROOT)
            }
        },
        variables: {
            input: {
                code
            }
        },
        onError:(error) => {
            toast.error(error.message)
        }
    })
}