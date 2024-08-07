import { ListPage, ListProvider } from '@/components/screens/list'
import { absolutePath } from '@/lib'
import { getListById } from '@/services'
import { INITIAL_POSTS_LIMIT } from '@/shared/config'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata/list'
import { constructNotFoundMetadata } from '@/shared/metadata/not-found'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface IPageProps {
	params: {
		listId: string
	}
}

export async function generateMetadata({
	params
}: IPageProps): Promise<Metadata> {
	if (!params.listId) return constructNotFoundMetadata()
	const data = await getListById({
		listId: params.listId,
		take: INITIAL_POSTS_LIMIT
	})
	if (!data) return constructNotFoundMetadata()

	const storiesCount = data.list._count.posts
	return constructMetadata({
		list: data.list,
		pageUrl: absolutePath(`${Routes.PROFILE_ME_LISTS}/${params.listId}`),
		title: `List: ${data.list.name} | Created by ${data.list.creator.username}`,
		description: `${
			storiesCount === 0
				? 'No Stories'
				: storiesCount === 1
				? `${storiesCount} story`
				: storiesCount > 1 && `${storiesCount} stories`
		} · Description`
	})
}

const Page = async ({ params }: IPageProps) => {
	if (!params.listId) return notFound()

	const data = await getListById({
		listId: params.listId,
		take: INITIAL_POSTS_LIMIT
	})

	if (!data) return notFound()

	const { list, posts } = data

	return (
		<ListProvider initialList={list} initialPosts={posts}>
			<ListPage />
		</ListProvider>
	)
}

export default Page
