import { PostsList } from '@/components/screens/profile'
import { FIND_POSTS } from '@/graphql'
import { absolutePath } from '@/lib'
import { getPosts, getUserById } from '@/services'
import { Routes } from '@/shared/constants'
import { constructNotFoundMetadata } from '@/shared/metadata/not-found'
import { constructMetadata } from '@/shared/metadata/profile'
import { TypeBaseUser, TypeFindPostsResponse } from '@/shared/types'
import { Metadata } from 'next'

interface IPageProps {
	params: {
		userId: string
	}
}

export async function generateMetadata({
	params
}: IPageProps): Promise<Metadata> {
	if(!params.userId) return constructNotFoundMetadata()
	const user = (await getUserById(params.userId)) as TypeBaseUser
	if (!user) return constructNotFoundMetadata()
	return constructMetadata({
		user,
		pageUrl: absolutePath(`${Routes.PROFILE}/${params.userId}`),
		title: user.username,
		description: 'Start exploring user stories'
	})
}

const Page = async ({ params }: IPageProps) => {
	const user = (await getUserById(params.userId)) as TypeBaseUser

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
				<p className="text-zinc-700 text-base">
					<b>{user.username}</b> has not created any stories yet
				</p>
			)}
		</div>
	)
}

export default Page
