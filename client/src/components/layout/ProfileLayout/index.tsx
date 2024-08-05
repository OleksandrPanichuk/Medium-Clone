import { Sidebar, Tabs } from '@/components/screens/profile'

import type { TypeBaseUser } from '@/shared/types'
import { PropsWithChildren } from 'react'

import styles from './ProfileLayout.module.scss'

interface IProfileLayoutProps {
	user: TypeBaseUser
}

export const ProfileLayout = async ({
	children,
	user
}: PropsWithChildren<IProfileLayoutProps>) => {
	return (
		<>
			<main className="flex">
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<h1 className={styles.username}>{user?.username}</h1>
						<Tabs user={user} />
						{children}
					</div>
				</div>
				<Sidebar initialUser={user} />
			</main>
		</>
	)
}
