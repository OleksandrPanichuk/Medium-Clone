'use client'

import { FetchMoreButton, PostCard } from '@/components/common'
import { Separator } from '@/components/ui'
import { FIND_POSTS } from '@/graphql'
import { useInfinitePostsQuery } from '@/services'
import { POSTS_LOADING_SKELETONS_COUNT } from '@/shared/config'
import { TypeFindPostsResponse } from '@/shared/types'
import { Fragment } from 'react'

interface IFeedProps {
	initialPosts: TypeFindPostsResponse[]
}

export const Feed = ({ initialPosts }: IFeedProps) => {
	const { ref, loading, posts, canFetchMore, fetchMore } =
		useInfinitePostsQuery({
			initialPosts,
			query: FIND_POSTS,
			options: {
				sortBy: 'createdAt'
			}
		})

	return (
		<>
			<div className={'flex flex-col gap-y-4'}>
				{!posts.length && (
					<h3 className={'text-xl my-4 text-gray-primary'}>No stories found</h3>
				)}
				{posts.map((post) => (
					<Fragment key={post.id}>
						<PostCard post={post} />
						<Separator />
					</Fragment>
				))}
				{loading && <Feed.Skeleton />}
			</div>
			<div ref={ref} className="h-1 hidden md:block" />
			<div className="md:hidden my-6 w-full ">
				<FetchMoreButton
					canFetchMore={canFetchMore}
					loading={loading}
					onClick={fetchMore}
				/>
			</div>
		</>
	)
}

Feed.Skeleton = function FeedSkeleton() {
	const fakeArray = new Array(POSTS_LOADING_SKELETONS_COUNT).fill(0)
	return fakeArray.map((_, index) => (
		<Fragment key={index}>
			<PostCard.Skeleton />
			<Separator />
		</Fragment>
	))
}
