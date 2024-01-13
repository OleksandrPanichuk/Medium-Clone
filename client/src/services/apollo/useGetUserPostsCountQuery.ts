import { GET_USER_POSTS_COUNT } from "@/graphql"
import { useQuery } from "@apollo/client"



export const useGetUserPostsCountQuery = () => {
    return useQuery<{posts:number}>(GET_USER_POSTS_COUNT, {
        fetchPolicy:'cache-first'
    })
}