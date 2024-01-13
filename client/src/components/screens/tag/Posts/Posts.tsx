'use client'
import type { TypeFindPostsForTagPageResponse } from '@/shared/types'

import styles from './Posts.module.scss'
import { PostCard, PostsSkeleton } from '@/components/screens/tag'
import { useInfinitePostsQuery } from '@/services'
import { INITIAL_POSTS_LIMIT, POSTS_INCREMENT } from '@/shared/config'
import { useParams } from 'next/navigation'
import { FIND_POSTS_FOR_TAG_PAGE } from '@/graphql'

interface IPostsProps {
	initialPosts: TypeFindPostsForTagPageResponse[]
}

export const Posts = ({ initialPosts }: IPostsProps) => {
	const params = useParams<{ tagName: string }>()

	const { posts, loading, ref } =
		useInfinitePostsQuery<TypeFindPostsForTagPageResponse>({
			initialPosts,
			query: FIND_POSTS_FOR_TAG_PAGE,
			options: {
				take: POSTS_INCREMENT,
				initialPostsLimit: INITIAL_POSTS_LIMIT,
				tag: params.tagName
			}
		})

	return (
		<>
			<div className={styles.posts}>
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
				{loading && <PostsSkeleton />}
			</div>
			<div ref={ref} className="h-1" />
		</>
	)
}
