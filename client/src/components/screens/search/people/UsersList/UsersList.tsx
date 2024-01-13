'use client'

import { useInfiniteUsersQuery } from '@/services'
import { TypeBaseUser } from '@/shared/types'
import { useSearchParams } from 'next/navigation'
import styles from './UsersList.module.scss'
import { ChevronDown, Loader2 } from 'lucide-react'
import { UserCard } from '@/components/screens/search/people'

import { Fragment } from 'react'
import { Separator } from '@/components/ui'
import { PEOPLE_INCREMENT } from '@/shared/config'

interface IUsersListProps {
	initialUsers: TypeBaseUser[]
}

const UsersList = ({ initialUsers }: IUsersListProps) => {
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q') as string
	const { canFetchMore, loading, fetchMore, users } = useInfiniteUsersQuery({
		initialUsers,
		searchValue
	})

	const fakeArray = new Array(PEOPLE_INCREMENT).fill(0)

	return (
		<div className={styles.wrapper}>
			<div className={styles.list}>
				{users.map((user) => (
					<Fragment key={user.id}>
						<UserCard user={user} />
						<Separator />
					</Fragment>
				))}
				{loading &&
					fakeArray.map((_, index) => <UserCard.Skeleton key={index} />)}
			</div>

			{canFetchMore && (
				<button onClick={fetchMore} disabled={loading}>
					{loading ? (
						<Loader2 className={styles.loader} />
					) : (
						<span className={styles.more}>
							<ChevronDown />
							Show More
						</span>
					)}
				</button>
			)}
		</div>
	)
}
export default UsersList