import { ListsProvider, ListsView } from '@/components/screens/profile/lists'
import { absolutePath } from '@/lib'
import { getLists, getUserById } from '@/services'
import { INITIAL_LISTS_LIMIT } from '@/shared/config'
import { Routes } from '@/shared/constants'
import { constructNotFoundMetadata } from '@/shared/metadata/not-found'
import { constructMetadata } from '@/shared/metadata/profile'
import { TypeBaseUser } from '@/shared/types'
import { Metadata } from 'next'

interface IPageProps {
	params: {
		userId: string
	}
}

export async function generateMetadata({
	params
}: IPageProps): Promise<Metadata> {
	if (!params.userId) return constructNotFoundMetadata()
	const user = (await getUserById(params.userId)) as TypeBaseUser
	if (!user) return constructNotFoundMetadata()
	return constructMetadata({
		user,
		pageUrl: absolutePath(`${Routes.PROFILE}/${params.userId}${Routes.LISTS}`),
		title: `Lists - ${user.username}`,
		description: 'Start exploring Reading list'
	})
}

const Page = async ({ params }: IPageProps) => {
	const user = (await getUserById(params.userId)) as TypeBaseUser

	const lists = await getLists({
		query: {
			creatorId: user.id,
			take: INITIAL_LISTS_LIMIT
		}
	})

	if (!lists) throw new Error('Failed to get lists')

	if (!lists.length) {
		return (
			<p className={'text-zinc-700 text-base'}>
				<b>{user.username}</b> has no active public lists
			</p>
		)
	}

	return (
		<ListsProvider initialLists={lists}>
			<ListsView userId={user.id} />
		</ListsProvider>
	)
}

export default Page
