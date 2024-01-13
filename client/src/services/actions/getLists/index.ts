'use server'

import {InputType, ReturnType} from '@/services/actions/getLists/types'
import {apolloClient} from '@/lib'
import {FIND_MANY_LISTS} from '@/graphql'
import {TypeFindManyList} from '@/shared/types'
import {cookies} from "next/headers";
import {variablesSchema} from "@/services/actions/getLists/schema";

export async function getLists({
                                   query,
                                
                               }: InputType): Promise<ReturnType> {
    try {
         variablesSchema.parse(query)

        const {data} = await apolloClient.query<{ lists: TypeFindManyList[] }>({
            query: FIND_MANY_LISTS,
            variables: {
                query
            },
            context: {
                headers: {
                    Cookie: cookies().toString()
                },
                cache:'no-store'
            },
            fetchPolicy:  'no-cache'
        })
        return data.lists
    } catch (err) {
        return
    }
}
