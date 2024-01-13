import { currentUser, getPosts } from '@/services'

import { PostsList } from '@/components/screens/profile'
import type { TypeFindPostsResponse } from '@/shared/types'
import { FIND_POSTS } from '@/graphql'
import { redirect } from 'next/navigation'
import { Routes } from '@/shared/constants'
import { Metadata } from 'next'
import { constructMetadata } from '@/shared/metadata/profile'
import { absolutePath } from '@/lib'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import styles from './page.module.scss'

export async function generateMetadata(): Promise<Metadata> {
	const user = await currentUser()
	if (!user) return {}
	return constructMetadata({
		user,
		pageUrl: absolutePath(Routes.PROFILE_ME),
		title: user.username,
		description: 'Start exploring user stories'
	})
}

const Page = async () => {
	const user = await currentUser()
	if (!user) return redirect(Routes.SIGN_IN)

	const initialPosts = await getPosts<TypeFindPostsResponse>({
		variables: {
			creatorId: user.id
		},
		query: FIND_POSTS
	})

	return (
		<div>
			{!!initialPosts?.length && (
				<PostsList initialPosts={initialPosts} user={user} />
			)}
			{!initialPosts?.length && (
				<Link href={Routes.NEW_STORY} className={styles['new-story']}>
					<PlusCircle />
					Create Story
				</Link>
			)}
		</div>
	)
}

export default Page
