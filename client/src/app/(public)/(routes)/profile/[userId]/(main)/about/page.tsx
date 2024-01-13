import { getUserById } from '@/services'
import { TypeBaseUser } from '@/shared/types'
import styles from './page.module.scss'
import { Metadata } from 'next'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata/profile'
import { constructNotFoundMetadata } from '@/shared/metadata/not-found'
import { absolutePath } from '@/lib'

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
		pageUrl: absolutePath(`${Routes.PROFILE}/${params.userId}${Routes.ABOUT}`),
		title: `About - ${user.username}`,
		description: `About ${user.username} on Podium. `
	})
}

const Page = async ({ params }: IPageProps) => {
	const user = (await getUserById(params.userId)) as TypeBaseUser

	if (!user.about) {
		return (
			<p className={styles['no-about']}>
				<b>{user.username}</b> did not provide information about themselves
			</p>
		)
	}

	return (
		<div className={styles.content}>
			<pre className={styles.about}>{user.about}</pre>
		</div>
	)
}

export default Page
