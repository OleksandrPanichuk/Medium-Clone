"use client"

import { LISTS_SEARCH_QUERY, PEOPLE_SEARCH_QUERY, POST_SEARCH_QUERY, TAGS_SEARCH_QUERY } from "@/graphql"
import { SEARCH_LISTS_TAKE, SEARCH_PEOPLE_TAKE, SEARCH_POSTS_TAKE, SEARCH_TAGS_TAKE } from "@/shared/config"
import { QueryHookOptions, useQuery } from "@apollo/client"
import { DocumentNode } from "graphql"

type QueryKeys = 'TAGS' | 'LISTS'  | 'PEOPLE' | "POSTS"

interface IOptions<TData> extends QueryHookOptions<TData>  {

}

type TypeTake = {
    readonly [key in Exclude<QueryKeys,'LISTS'>]: number
}


type TypeTakeWithLists = TypeTake & {
    readonly LISTS: number
}

type TypeLimits = {
    [key in QueryKeys]: key extends 'LISTS' ? TypeTakeWithLists  : TypeTake;
};

const Queries: {[key in QueryKeys] : DocumentNode} = {
    TAGS :TAGS_SEARCH_QUERY,
    LISTS : LISTS_SEARCH_QUERY,
    PEOPLE: PEOPLE_SEARCH_QUERY,
    POSTS: POST_SEARCH_QUERY
}

const Limits: TypeLimits = {
    TAGS: SEARCH_TAGS_TAKE,
    LISTS: SEARCH_LISTS_TAKE,
    POSTS: SEARCH_POSTS_TAKE,
    PEOPLE:SEARCH_PEOPLE_TAKE
}


export const useMultipleSearchQuery = <TData>(searchValue:string | undefined,type:QueryKeys, options?:IOptions<TData>) => {
    const LIMIT = Limits[type]
    const query = Queries[type]
    
    return useQuery<TData>(query, {
        ...options,
        variables: {
            searchValue,
            takePosts: LIMIT.POSTS,
            takeUsers: LIMIT.PEOPLE,
            takeTags: LIMIT.TAGS,
            ...("LISTS" in LIMIT && {
                takeLists: LIMIT.LISTS,
                withoutCurrentUserLists: true
            })
        },
        skip:options?.skip ?? !searchValue,
        fetchPolicy: options?.fetchPolicy ?? 'cache-first'
    })
}