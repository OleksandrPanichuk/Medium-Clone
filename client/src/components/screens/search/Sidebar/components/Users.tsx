'use client'
import type { TypeBaseUser } from '@/shared/types'
import styles from '../Sidebar.module.scss'
import { cn } from '@/lib'
import { useSidebarNavigate } from '../Sidebar.hooks'
import { Avatar, Separator } from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'

interface IUsersProps {
	searchValue: string
	users: TypeBaseUser[]
}

export const Users = ({ searchValue, users }: IUsersProps) => {
	const navigate = useSidebarNavigate()

	return (
		<section className={styles.result}>
			<h4 className={styles.result__type}>
				People matching <span>{searchValue}</span>
			</h4>
			{users.map((user) => (
				<div
					key={user.id}
					className={cn(styles.user, !user.about && 'items-center')}
				>
					<Avatar
						className={styles.user__avatar}
						src={user.avatar?.url}
						onClick={() => navigate('people', user.id)}
					/>
					<div onClick={() => navigate('people', user.id)}>
						<h5 className={styles.user__username}>{user.username}</h5>
						{user.about && <p className={styles.user__about}>{user.about}</p>}
					</div>
				</div>
			))}
			<Link
				className={styles.see__all}
				href={`${Routes.SEARCH_PEOPLE}?q=${searchValue}`}
			>
				See all
			</Link>
			<Separator />
		</section>
	)
}
