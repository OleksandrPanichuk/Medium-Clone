'use client'
import {
	Avatar,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Separator
} from '@/components/ui'
import styles from './UserButton.module.scss'
import Link from 'next/link'
import { Edit, LogOut, Settings, User } from 'lucide-react'

import { toast } from 'sonner'

import { useAuth } from '@/components/providers'
import { useModalStore } from '@/store'
import { Modals, Routes } from '@/shared/constants'

export const UserButton = () => {
	const { user, signOut, isSignOut } = useAuth()

	const { onOpen } = useModalStore()

	const onSignOut = async () => {
		try {
			await signOut()
		} catch (err) {
			toast.error('Something went wrong')
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar src={user?.avatar?.url} name={user?.username} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className={styles.content}>
				<div className={styles.info}>
					<h3>{user?.username}</h3>
					<p>{user?.email}</p>
				</div>
				<Separator />
				<DropdownMenuItem disabled={isSignOut} asChild className={styles.item}>
					<Link href={Routes.PROFILE_ME}>
						<User />
						My Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isSignOut}
					onClick={() => onOpen(Modals.EDIT_PROFILE)}
					className={styles.item}
				>
					<Edit />
					Edit Profile
				</DropdownMenuItem>
				<DropdownMenuItem disabled={isSignOut} asChild className={styles.item}>
					<Link href={Routes.SETTINGS}>
						<Settings />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isSignOut}
					className={styles.item}
					onClick={onSignOut}
				>
					<LogOut />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
