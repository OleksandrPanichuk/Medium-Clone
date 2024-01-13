"use server"
import { FIND_POST_CLAPS } from "@/graphql";
import { apolloClient } from "@/lib";
import { TypePostClap } from "@/shared/types";


export async function getPostClaps(postId:string): Promise<TypePostClap[] | null> {
    try {
        const {data} = await apolloClient.query<{claps:TypePostClap[]}>({
            query:FIND_POST_CLAPS,
            variables: {
                input:{
                    postId
                }
            },
            fetchPolicy:"no-cache"
        })

        return data.claps
    } catch (err) {
        return null
    }
}