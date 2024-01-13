"use client"

import { FIND_TRENDING_POSTS } from "@/graphql"
import { TRENDING_POSTS_COUNT } from "@/shared/config"
import { TypeTrendingPost } from "@/shared/types"
import { QueryHookOptions, useQuery } from "@apollo/client"

type ResponseType = {posts: TypeTrendingPost[]}

export const useTrendingPostsQuery = (options?:QueryHookOptions<ResponseType>) => {
    return useQuery<ResponseType>(FIND_TRENDING_POSTS, {
        ...options,
        variables: {
            query: {
                sortBy:'claps',
                take:TRENDING_POSTS_COUNT,
                sortOrder:'desc',
                ...options?.variables,
            }
        }
    })
}