"use server"

import { FIND_TAG_BY_NAME } from "@/graphql"
import { apolloClient } from "@/lib"
import { TypeTagExtended } from "@/shared/types"
import { cookies } from "next/headers"


export async function getTagByName(tagName:string): Promise<TypeTagExtended | null | undefined> {
    try {
        const {data} = await apolloClient.query<{tag:TypeTagExtended | null}>({
            query:FIND_TAG_BY_NAME,
            variables: {
                input: {
                    tagName
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
        
        return data.tag
    } catch (err) {
        return
    }
}