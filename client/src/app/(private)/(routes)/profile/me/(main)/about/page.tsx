import { AboutMePage } from '@/components/screens/profile/about'
import { absolutePath } from '@/lib'
import { currentUser } from '@/services'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata/profile'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
	const user = await currentUser()
	if (!user) return {}
	return constructMetadata({
		user,
		pageUrl: absolutePath(Routes.PROFILE_ME_LISTS),
		title: `About - ${user.username}`,
		description: `About ${user.username} on Podium. `
	})
}

const Page = () => {
	return <AboutMePage />
}

export default Page
