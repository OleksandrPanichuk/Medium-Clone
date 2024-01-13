"use client"

import { Routes } from "@/shared/constants";
import { TypeFindPostsResponse, TypeListExtended, TypeListPost } from "@/shared/types";
import { useRouter } from "next/navigation";
import { Dispatch, PropsWithChildren, createContext, useContext, useState, SetStateAction } from "react";

interface IListProviderProps {
    initialList:TypeListExtended
    initialPosts: TypeListPost[]
}
interface IListContext  {
  setList: Dispatch<SetStateAction<TypeListExtended>>
  setPosts:Dispatch<SetStateAction<TypeListPost[]>>
  list:TypeListExtended
  posts: TypeListPost[]
  onListStatusChange: (newStatus:boolean) => void
  onListDescriptionChange: (newDescription:string) => void
  onListNameChange: (newName:string) => void
  onListDelete:(listId:string) => void
  onPostListChange: (
		post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string
	) => void
}

const ListContext = createContext<IListContext>({} as IListContext) 

export const ListProvider = ({initialList, initialPosts,  children}:PropsWithChildren<IListProviderProps>) => {
  const [list, setList] = useState(initialList)
  const [posts, setPosts] = useState(initialPosts)

  const router = useRouter()

  const onPostListChange = (post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string ) => {
      if(type === 'removed' && listId === list.id) {
        setPosts(prev => prev.filter(item => item.id !== post.id))
      }
  }

  const onListStatusChange = (newStatus: boolean) => {
		setList(prev => ({ ...prev, public: newStatus }))
	}
	const onListDescriptionChange = (newDescription:string) => {
		setList(prev => ({...prev, description:newDescription}))
	}
	const onListNameChange = (newName:string ) => {
		setList(prev => ({...prev, name:newName}))
	}

  const onListDelete = () => {
    router.push(Routes.ROOT)
  }

  return <ListContext.Provider value={{list,onPostListChange, posts, setList, setPosts,onListDelete, onListDescriptionChange, onListNameChange, onListStatusChange}}>{children}</ListContext.Provider>;
};
export const useListContext = () => useContext(ListContext)
