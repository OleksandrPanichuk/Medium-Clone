import type { TypeFindManyListForPost } from '@/shared/types'
import {create} from 'zustand'

type SetListsCallback = (prevState:TypeFindManyListForPost[]) => TypeFindManyListForPost[]

interface IListsStore {
    lists: TypeFindManyListForPost[]
    setLists: (state:   TypeFindManyListForPost[] | SetListsCallback )  => void
    removeFromList:(postId:string,  listId:string) => void
    addToList:(postId:string, listId:string) => void
    changeListData: (listId:string, data:{name?:string, public?:boolean}) => void
    removeList:(listId:string) => void
} 

export const useListsStore = create<IListsStore>(set => ({
    lists:[],
    setLists: (state) => set(currentState => ({lists:typeof state === 'function' ? state(currentState.lists) : state})),
    removeFromList:(postId, listId) => set(state => ({lists:state.lists.map((item) => ({
        ...item,
        posts:
            item.id === listId
                ? item.posts.filter((listPost) => listPost.id !== postId)
                : item.posts
    }))})),
    addToList: (postId, listId) => set(state => ({lists:state.lists.map((item) => item.id === listId ? ({
        ...item,
        posts: [...item.posts, { id: postId }]
    }) : item )})) ,
    changeListData:(listId, data) => set(state => ({lists:state.lists.map(list => list.id === listId ? ({...list,...data}) : list)}) ),
    removeList:(listId) => set(state => ({lists:state.lists.filter(list => list.id !== listId)}))
}))