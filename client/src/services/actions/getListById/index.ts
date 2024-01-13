"use server"

import { apolloClient } from "@/lib";
import { InputType, ReturnType } from "./types";
import { FIND_LIST } from "@/graphql";
import { cookies } from "next/headers";

export const getListById = async ({listId, take}:InputType): Promise<ReturnType> => {
    try {
        const {data} = await apolloClient.query<NonNullable<ReturnType>>({
            query: FIND_LIST,
            variables: {
                input: {
                    listId
                },
                query: {
                    listId,
                    take
                }
            },
            fetchPolicy:"no-cache",
            context: {
                headers: {
                    Cookie: cookies().toString()
                },
                cache:'no-store'
            }
        })
        return data 
    } catch {
        return
    }
}