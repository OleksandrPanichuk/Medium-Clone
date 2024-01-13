"use server"

import { FIND_POST_BY_ID } from "@/graphql"
import { apolloClient } from "@/lib"
import { TypeFindPostByIdResponse } from "@/shared/types"
import { cookies } from "next/headers"


export async function getPostById(postId:string): Promise<TypeFindPostByIdResponse  | null> {
    try {
        const {data} = await apolloClient.query<{post:TypeFindPostByIdResponse}>({
            query: FIND_POST_BY_ID,
            variables:{
                input: {
                    postId
                }
            },
            fetchPolicy:'no-cache',
            context: {
                headers: {
                    Cookie: cookies().toString()
                },
                  cache:'no-store'
                
            },
        })
      
      
        return data.post
    } catch (err) {
        return null
    }
}