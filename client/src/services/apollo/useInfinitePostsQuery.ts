'use client'
import { INITIAL_POSTS_LIMIT, POSTS_INCREMENT } from '@/shared/config'
import { DocumentNode, QueryResult, useLazyQuery } from '@apollo/client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface IUseInfinitePostsQueryProps<T> {
	initialPosts: T[]
	query: DocumentNode
	options?: {
		take?: number
		initialPostsLimit?: number
		tag?: string
		searchValue?: string | null
		creatorId?:string
		sortBy?:string
	}
}

interface IUseInfinitePostsQueryResponse<T> {
	posts: T[]
	ref: (node?: Element | null | undefined) => void
	loading: boolean
	fetchMore: () => Promise<QueryResult<{ posts: T[] }>>
	canFetchMore: boolean
}

export const useInfinitePostsQuery = <T>({
	initialPosts,
	query,
	options
}: IUseInfinitePostsQueryProps<T>): IUseInfinitePostsQueryResponse<T> => {
	const [canLoadMore, setCanLoadMore] = useState<boolean>(
		options?.initialPostsLimit
			? initialPosts.length === options.initialPostsLimit
			: initialPosts.length === INITIAL_POSTS_LIMIT
	)

	const [posts, setPosts] = useState<T[]>(initialPosts)

	const increment = options?.take ?? POSTS_INCREMENT

	const { inView, ref } = useInView()

	const [loadMore, { loading }] = useLazyQuery<{
		posts: T[]
	}>(query, {
		onCompleted: (data) => {
			setPosts((prev) => [...prev, ...data.posts])

			if (data.posts.length !== increment) setCanLoadMore(false)
		}
	})

	const fetchMore = useCallback(async () => {
		return await loadMore({
			variables: {
				query: {
					take: increment,
					skip: posts.length ?? 0,
					sortBy:options?.sortBy,
					...(!!options?.tag && {
						tag: options.tag
					}),
					...(!!options?.searchValue && { searchValue: options.searchValue }),
					...(!!options?.creatorId && {creatorId:options.creatorId})
				}
			}
		})
	}, [posts.length, increment, loadMore, options?.tag,options?.sortBy, options?.searchValue, options?.creatorId])

	useEffect(() => {
		if (!loading && canLoadMore && inView) {
			fetchMore()
		}
	}, [loading, inView, canLoadMore, fetchMore])

	return {
		posts,
		ref,
		loading,
		fetchMore,
		canFetchMore: canLoadMore
	}
}
