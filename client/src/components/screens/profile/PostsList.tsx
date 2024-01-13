'use client'

import { PostCard } from '@/components/common'
import { Separator } from '@/components/ui'
import { FIND_POSTS } from '@/graphql'
import { useInfinitePostsQuery } from '@/services'
import { POSTS_LOADING_SKELETONS_COUNT } from '@/shared/config'
import type { TypeBaseUser, TypeFindPostsResponse } from '@/shared/types'
import { Fragment } from 'react'

interface IPostsListProps {
	initialPosts: TypeFindPostsResponse[]
	user: TypeBaseUser
}

export const PostsList = ({ initialPosts, user }: IPostsListProps) => {
	const { loading, posts, ref } = useInfinitePostsQuery<TypeFindPostsResponse>({
		initialPosts,
		query: FIND_POSTS,
		options: {
			creatorId: user.id
		}
	})

	const fakeArray = new Array(POSTS_LOADING_SKELETONS_COUNT).fill(0)

	return (
		<>
			<div className={'flex flex-col gap-y-4'}>
				{posts.map((post) => (
					<Fragment key={post.id}>
						<PostCard post={post} />
						<Separator />
					</Fragment>
				))}
				{loading &&
					fakeArray.map((_, index) => (
						<Fragment key={index}>
							<PostCard.Skeleton />
							<Separator />
						</Fragment>
					))
				}
			</div>
			<div ref={ref} className="h-1" />
		</>
	)
}

