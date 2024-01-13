import type { TypeFindManyList } from "@/shared/types";
import { ApolloClient, useApolloClient, ApolloCache } from "@apollo/client";


type TypeModifyListData = {
    public?:boolean
    name?:string 
    description?:string
}

class CacheManager {
    private readonly cache:ApolloCache<object> 

    constructor(client: ApolloClient<object>) {
        this.cache = client.cache
    }    
    public increaseUserPostsCount() {
        try {
            this.cache.modify<{
                getUserPostsCount:number
            }>({
                id:'ROOT_QUERY',
                fields: {
                    getUserPostsCount: prev => prev++
                }
            })
        } catch {}
    }

    public decreaseUserPostsCount() {
        try {
            this.cache.modify<{
                getUserPostsCount:number
            }>({
                id:'ROOT_QUERY',
                fields: {
                    getUserPostsCount: prev => prev--
                }
            }) 
        } catch{}
    }

    public addPostToList(postId:string, listId:string) {}
    
    public modifyList(listId:string, data: TypeModifyListData) {
           try {
            this.cache.modify<Omit<TypeFindManyList, 'createdAt'>>({
                id:`FindManyListsResponse:${listId}`,
                fields: {
                    description:(prev) => data.description ?? prev,
                    name:(prev) => data.name ?? prev,
                    public: (prev) => data.public ?? prev,
                }
            })
           } catch {}
    }

    
    public deletePost(postId:string) {
        this.cache.evict({
            id:`FullPostEntity:${postId}`
        })
        this.cache.evict({
            id:`FindTrendingPostsResponse:${postId}`
        })
    }

    public deleteList(listId:string) {
        this.cache.evict({
            id: `FindManyListsResponse:${listId}`
        })
        this.cache.evict({
            id:`ListEntityWithCreatorWithCount:${listId}`
        })
    }

    public deleteComment(commentId:string) {
        this.cache.evict({
            id:`PostCommentEntityWithCreator:${commentId}`
        })
        this.cache.evict({
            id:`PostCommentEntity:${commentId}`
        })
    }
}


export const useCacheManager = () => {
    const apolloClient = useApolloClient()
    return new CacheManager(apolloClient)
}

