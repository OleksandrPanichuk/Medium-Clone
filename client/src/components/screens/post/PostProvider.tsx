'use client'

import  type { TypeFindPostByIdResponse, TypePostCommentWithCreator } from '@/shared/types'
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react'

type TypePostContextProps  =  {
	post: TypeFindPostByIdResponse
	sortBy:"createdAt" | "claps"
	setSortBy: Dispatch<SetStateAction<'createdAt' | 'claps'>>
	comments: TypePostCommentWithCreator[] | null
	setComments: Dispatch<SetStateAction<TypePostCommentWithCreator[] | null>>
}

const PostContext = createContext<TypePostContextProps>({} as TypePostContextProps)

export const PostProvider = ({
	post,
	children
}: PropsWithChildren<{ post: TypeFindPostByIdResponse }>) => {
	const [sortBy, setSortBy] = useState<'createdAt' | 'claps'>('createdAt')
	const [comments, setComments] = useState<TypePostCommentWithCreator[] | null>(null) 

	return (
		<PostContext.Provider value={{post, sortBy, setSortBy, comments, setComments}}>{children}</PostContext.Provider>
	)
}

export const usePostContext = () => useContext(PostContext)