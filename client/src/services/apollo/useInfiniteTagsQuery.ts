'use client'
import { TypeTag } from '@/shared/types'
import { useCallback, useState } from 'react'
import { QueryResult, useLazyQuery } from '@apollo/client'
import { INFINITE_TAGS_QUERY } from '@/graphql'
import { SEARCH_TAGS_TAKE, TAGS_INCREMENT } from '@/shared/config'

interface IUseInfiniteTagsQueryProps {
	initialTags: TypeTag[]
	searchValue: string
}

interface IUseInfiniteTagsQueryResponse {
	tags: TypeTag[]
	loading: boolean
	fetchMore: () => Promise<QueryResult<{ tags: TypeTag[] }>>
	canFetchMore: boolean
}

export const useInfiniteTagsQuery = ({
	initialTags,
	searchValue
}: IUseInfiniteTagsQueryProps): IUseInfiniteTagsQueryResponse => {
	const [canLoadMore, setCanLoadMore] = useState<boolean>(
		initialTags.length === SEARCH_TAGS_TAKE.TAGS
	)
	const [tags, setTags] = useState<TypeTag[]>(initialTags)

	const [loadMore, { loading }] = useLazyQuery<{ tags: TypeTag[] }>(
		INFINITE_TAGS_QUERY,
		{
			onCompleted: (data) => {
				const filteredData = data.tags.filter((newTag) => !tags.some(tag => tag.name === newTag.name ))
				setTags((prev) => [...prev, ...filteredData])

				if (data.tags.length !== TAGS_INCREMENT) setCanLoadMore(false)
			}
		}
	)

	const fetchMore = useCallback(async () => {
		return await loadMore({
			variables: {
				query: {
					take: TAGS_INCREMENT,
					skip: tags.length,
					searchValue
				}
			}
		})
	}, [tags.length, loadMore, searchValue])

	return {
		tags,
		canFetchMore: canLoadMore,
		fetchMore,
		loading
	}
}
