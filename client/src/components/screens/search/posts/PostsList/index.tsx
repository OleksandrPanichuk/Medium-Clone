'use client'
import { TypeFindPostsResponse } from '@/shared/types'
import { Fragment } from 'react'
import { FetchMoreButton, PostCard } from '@/components/common'
import { Separator } from '@/components/ui'
import { useInfinitePostsQuery } from '@/services'
import { FIND_POSTS } from '@/graphql'
import { SEARCH_POSTS_TAKE } from '@/shared/config'
import styles from './PostsList.module.scss'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, Loader2 } from 'lucide-react'

interface IPostsListProps {
	initialPosts: TypeFindPostsResponse[]
}

export const PostsList = ({ initialPosts }: IPostsListProps) => {
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q')
	const { posts, loading, fetchMore, canFetchMore } =
		useInfinitePostsQuery<TypeFindPostsResponse>({
			initialPosts,
			query: FIND_POSTS,
			options: {
				initialPostsLimit: SEARCH_POSTS_TAKE.POSTS,
				take: SEARCH_POSTS_TAKE.POSTS,
				searchValue
			}
		})

	const fakeArray = new Array(SEARCH_POSTS_TAKE.POSTS).fill(0)

	return (
		<div className={styles.wrapper}>
			{posts.map((post) => (
				<Fragment key={post.id}>
					<PostCard post={post} />
					<Separator />
				</Fragment>
			))}
			{loading && (
				<>
					{fakeArray.map((_, index) => (
						<Fragment key={index}>
							<PostCard.Skeleton />
							<Separator />
						</Fragment>
					))}
				</>
			)}
			<FetchMoreButton onClick={fetchMore} canFetchMore={canFetchMore} loading={loading} />
		</div>
	)
}
