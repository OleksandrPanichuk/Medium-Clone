"use client"
import { FIND_MANY_LISTS } from "@/graphql"
import { INITIAL_LISTS_LIMIT, LISTS_INCREMENT } from "@/shared/config"
import type { TypeFindManyList } from "@/shared/types"
import { LazyQueryHookOptions, QueryResult, useLazyQuery } from "@apollo/client"
import { useCallback, useState } from "react"


type ResponseType = {
	lists: TypeFindManyList[]
}

interface IUseInfiniteListsQueryProps extends LazyQueryHookOptions<ResponseType> {
    creatorId?:string
	initialLists?: TypeFindManyList[]
	initialLimit?: number
	mode?: 'withSkip' | 'withArray'
}

interface IUseInfiniteListsQueryResponse {
	data: TypeFindManyList[]
    loading:boolean
    canFetchMore:boolean
    fetchMore:() => Promise<QueryResult<{ lists: TypeFindManyList[] }>>
}

export const useInfiniteListsQuery = ({ creatorId, initialLists = [], initialLimit = INITIAL_LISTS_LIMIT,onCompleted, variables, mode = 'withSkip',...options}:IUseInfiniteListsQueryProps = {}): IUseInfiniteListsQueryResponse => {
		const [lists, setLists] = useState<TypeFindManyList[]>(initialLists) 
		const [canLoadMore, setCanLoadMore] = useState<boolean>(
			  lists.length ===  initialLimit
		)

		const [loadMore, { loading }] = useLazyQuery<ResponseType>(FIND_MANY_LISTS, {
			onCompleted: (data) => {
				setLists((prev) => [...prev, ...data.lists])
				if (data.lists.length !== LISTS_INCREMENT) setCanLoadMore(false)

				onCompleted?.(data)
			},
			...options 
		})

		

		const fetchMore = useCallback(async () => {
			return await loadMore({
				variables: {
					query: {
						take: LISTS_INCREMENT,
						creatorId,
						...(mode === 'withArray' ? {
							lists: lists.map(list => list.id)
						} : {
							skip: lists.length ?? 0
						}),
						...variables
					}
				}
			})
		}, [loadMore, creatorId, variables, lists, mode])

		return {
			loading,
			data:lists,
			fetchMore,
			canFetchMore: canLoadMore
		}
}