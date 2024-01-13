'use client'
import { PostDescription, useListContext } from '@/components/screens/list'
import { useInfiniteListPostsQuery } from '@/services'
import { Fragment } from 'react'
import { PostCard } from '@/components/common'
import { Separator } from '@/components/ui'
import { ChevronDown, Loader2 } from 'lucide-react'
import styles from './PostsList.module.scss'
import { POSTS_LOADING_SKELETONS_COUNT } from '@/shared/config'

export const PostsList = () => {
	const { posts, onPostListChange } = useListContext()
	const { loading, fetchMore, canFetchMore } = useInfiniteListPostsQuery()

	const fakeArray = new Array(POSTS_LOADING_SKELETONS_COUNT).fill(0)
	return (
		<div className={styles.wrapper}>
			{posts.map((post) => (
				<div key={post.id}>
					<PostDescription post={post} />
					<PostCard onPostListChange={onPostListChange} post={post} />
					<Separator />
				</div>
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
			{canFetchMore && (
				<button className={"flex justify-center"} onClick={fetchMore} disabled={loading}>
					{loading ? (
						<Loader2 className={styles.loader} />
					) : (
						<span className={styles.more}>
							<ChevronDown />
							Show More
						</span>
					)}
				</button>
			)}
		</div>
	)
}
