'use client'
import { TypeBaseUser } from '@/shared/types'
import styles from './UserCard.module.scss'
import { Avatar, Skeleton } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { memo, NamedExoticComponent } from 'react'
import { Routes } from '@/shared/constants'

interface IUserCardProps {
	user: TypeBaseUser
}

type TypeUserCard = NamedExoticComponent<IUserCardProps> & {
	Skeleton: () => JSX.Element
}

//@ts-ignore
export const UserCard: TypeUserCard = memo(function UserCard({
	user
}: IUserCardProps) {
	const router = useRouter()

	return (
		<div
			className={styles.wrapper}
			onClick={() => router.push(`${Routes.PROFILE}/${user.id}`)}
		>
			<Avatar
				name={user.username}
				src={user.avatar?.url}
				className={styles.avatar}
			/>
			<div className={styles.info}>
				<h3 className={styles.username}>{user.username}</h3>
				{user.about && <p className={styles.about}>{user.about}</p>}
			</div>
		</div>
	)
})

UserCard.Skeleton = function UserCardSkeleton() {
	return (
		<div className={styles.skeleton}>
			<Avatar isLoading className={styles.avatar} />
			<div className={styles.skeleton__info}>
				<Skeleton className={styles.skeleton__username} />
				<Skeleton className={styles.skeleton__about} />
			</div>
		</div>
	)
}
