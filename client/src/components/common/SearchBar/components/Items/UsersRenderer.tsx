import { TypeSearchUser } from '@/shared/types'
import styles from './styles.module.scss'
import { Avatar, Separator } from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'

interface IUsersRendererProps {
	users: TypeSearchUser[]
}

export const UsersRenderer = ({ users }: IUsersRendererProps) => {
	if (!users.length) return null
	return (
		<>
			<h3 className={styles.heading}>Users</h3>
			<Separator />
			{users.map((user) => (
				<li className={styles.item} key={user.id}>
					<Link className={'truncate'} href={`${Routes.PROFILE}/${user.id}`}>
						<Avatar src={user.avatar?.url} name={user.username} className={styles.image} />

						{user.username}
					</Link>
				</li>
			))}
		</>
	)
}
