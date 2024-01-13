"use server"

import { FIND_USER_BY_ID } from "@/graphql"
import { apolloClient } from "@/lib"
import { TypeBaseUser } from "@/shared/types"



export const getUserById = async (userId:string): Promise<TypeBaseUser | undefined> => {
    try {
        const {data} = await apolloClient.query<{user: TypeBaseUser}>({
            query: FIND_USER_BY_ID, 
            variables: {
                input: {
                    userId
                }
            },
            fetchPolicy:'no-cache'
        })

        return data.user 
    } catch (err) {
        return  
    }
}