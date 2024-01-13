"use client"
import { useAuth } from "@/components/providers";
import { FIND_MANY_LISTS_FOR_POSTS } from "@/graphql";
import { TypeFindManyListForPost } from "@/shared/types";
import { useListsStore } from "@/store";
import { useQuery, QueryHookOptions } from "@apollo/client";

interface IUseListsProps extends Partial<QueryHookOptions<{lists:TypeFindManyListForPost[]}>> {}

export const useListsQuery = (options:IUseListsProps  = {}) => {
    
    const {user} = useAuth()
    const {setLists,lists} = useListsStore()
    
    return useQuery<{lists:TypeFindManyListForPost[]}>(FIND_MANY_LISTS_FOR_POSTS, {
        ...options,
        fetchPolicy:'cache-first',
        variables: {
            query: {
                creatorId: user?.id
            }
        },
        onCompleted:(data) => {    
            !lists.length && setLists(data.lists)
            options.onCompleted?.(data)
        },
        skip:typeof options.skip === 'boolean' ? options.skip: !user
    })
}