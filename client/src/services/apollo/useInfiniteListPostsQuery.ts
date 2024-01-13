'use client'

import { useListContext } from '@/components/screens/list'
import { QueryResult, useLazyQuery } from '@apollo/client'
import { TypeListPost } from '@/shared/types'
import { useCallback, useState } from 'react'
import { INITIAL_POSTS_LIMIT, POSTS_INCREMENT } from '@/shared/config'
import { FIND_LIST_POSTS } from '@/graphql'

interface IUseInfiniteListPostsQueryPropsResponse {
	loading: boolean
	fetchMore: () => Promise<QueryResult<{ posts: TypeListPost[] }>>
	canFetchMore: boolean
}

export const useInfiniteListPostsQuery =
	(): IUseInfiniteListPostsQueryPropsResponse => {
		const { posts, setPosts, list } = useListContext()
		const [canLoadMore, setCanLoadMore] = useState<boolean>(
			posts.length === INITIAL_POSTS_LIMIT
		)

		const [loadMore, { loading }] = useLazyQuery<{
			posts: TypeListPost[]
		}>(FIND_LIST_POSTS, {
			onCompleted: (data) => {
				setPosts((prev) => [...prev, ...data.posts])

				if (data.posts.length !== POSTS_INCREMENT) setCanLoadMore(false)
			}
		})

		const fetchMore = useCallback(async () => {
			return await loadMore({
				variables: {
					input: {
						take: POSTS_INCREMENT,
						skip: posts.length ?? 0,
						listId: list.id
					}
				}
			})
		}, [posts.length, loadMore, list.id])

		return {
			loading,
			fetchMore,
			canFetchMore: canLoadMore
		}
	}
