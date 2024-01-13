"use client"
import { usePostContext } from "@/components/screens/post"
import { FIND_MANY_POST_COMMENTS } from "@/graphql"
import { COMMENTS_INCREMENT } from "@/shared/config"
import { TypePostCommentWithCreator } from "@/shared/types"
import { QueryResult, useLazyQuery } from "@apollo/client"
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface IusePostCommentsQueryProps {
    postId:string 
    sortBy:"claps" | "createdAt"
}

interface IusePostCommentsQueryResponse {
	comments: TypePostCommentWithCreator[] | null
	ref: (node?: Element | null | undefined) => void
	loading: boolean
	fetchMore: () => Promise<QueryResult<{ comments: TypePostCommentWithCreator[] }>>
	canFetchMore: boolean
}

export const usePostCommentsQuery = ({postId, sortBy}:IusePostCommentsQueryProps): IusePostCommentsQueryResponse => {
	const {setComments, comments} = usePostContext()
	const [canLoadMore, setCanLoadMore] = useState<boolean>(true)

	const { inView, ref } = useInView()

    const [loadMore, {loading}]  = useLazyQuery<{
		comments: TypePostCommentWithCreator[]
	}>(FIND_MANY_POST_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => {
			setComments((prev) => prev ? [...prev, ...data.comments] : data.comments)

			if (data.comments.length !== COMMENTS_INCREMENT) setCanLoadMore(false)
		}
	})

	const fetchMore = useCallback(async () => {
		return await loadMore({
				variables: {
					query: {
						postId,
						sortBy,
						comments: comments?.map(comment => comment.id) as string[],
						take:COMMENTS_INCREMENT
					}
				},
			
		})
	}, [comments, loadMore, sortBy, postId])

	useEffect(() => {
		if (!loading && canLoadMore && inView) {
			fetchMore()
		}
	}, [loading, inView, canLoadMore, fetchMore])

	useEffect(() => {
		setComments(null)
		loadMore({
			variables: {
				query: {
					postId,
					sortBy,
					take:COMMENTS_INCREMENT
				}
			}
		})
	}, [sortBy,postId, loadMore])

	return {
		loading,
		ref,
		comments,
		canFetchMore:canLoadMore,
		fetchMore
	}

}