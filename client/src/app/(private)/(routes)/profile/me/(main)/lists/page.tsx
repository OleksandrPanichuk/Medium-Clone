import { currentUser, getLists } from '@/services'
import { TypeCurrentUser } from '@/shared/types'
import { INITIAL_LISTS_LIMIT } from '@/shared/config'
import { ListsProvider, ListsView } from '@/components/screens/profile/lists'
import { Metadata } from 'next'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata/profile'
import { absolutePath } from '@/lib'

export async function generateMetadata():Promise<Metadata> {
	const user = await currentUser()
	if(!user) return {}
	return constructMetadata({user,pageUrl:absolutePath(Routes.PROFILE_ME_LISTS), title: `Lists - ${user.username}`, description:"Start exploring Reading list" })
}

const Page = async () => {
	const user = (await currentUser()) as TypeCurrentUser
	const lists = await getLists({
		query: {
			creatorId: user.id,
			take: INITIAL_LISTS_LIMIT
		}
	})
	

	if (!lists) throw new Error('Failed to get lists')
	
	return (
		<ListsProvider initialLists={lists}>
			<ListsView userId={user.id} />
		</ListsProvider>
	)
}

export default Page
