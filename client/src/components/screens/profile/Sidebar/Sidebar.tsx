'use client'
import type {TypeBaseUser} from '@/shared/types'

import {Avatar} from '@/components/ui'
import {useAuth} from '@/components/providers'
import styles from './Sidebar.module.scss'
import {useModalStore} from '@/store'
import {Modals} from "@/shared/constants";

interface ISidebarProps {
	initialUser: TypeBaseUser
}

export const Sidebar = ({ initialUser }: ISidebarProps) => {
	const { user: currentUser } = useAuth()

	const user: TypeBaseUser = initialUser.id === currentUser?.id ? currentUser : initialUser 

	const { onOpen } = useModalStore()
	return (
		<div className={styles.sidebar}>
			<Avatar
				name={user.username}
				className={styles.avatar}
				src={user.avatar?.url}
			/>
			<h3 className={styles.username}>{user.username}</h3>

			{currentUser?.id === user.id ? (
				<>
					{!!currentUser?.about?.trim() && (
						<pre className={styles.about}>{currentUser.about.trim()}</pre>
					)}
					<button
						className={styles['edit-profile']}
						onClick={() => onOpen(Modals.EDIT_PROFILE)}
					>
						Edit profile
					</button>
				</>
			) : (
				!!user.about?.trim() && (
					<pre className={styles.about}>{user.about.trim()}</pre>
				)
			)}
		</div>
	)
}
