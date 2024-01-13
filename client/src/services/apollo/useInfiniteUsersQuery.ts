'use client'
import { TypeBaseUser } from '@/shared/types'
import { useCallback, useState } from 'react'
import { QueryResult, useLazyQuery } from '@apollo/client'
import { FIND_USERS } from '@/graphql'
import { PEOPLE_INCREMENT, SEARCH_PEOPLE_TAKE } from '@/shared/config'

interface IUseInfiniteUsersQueryProps {
	initialUsers: TypeBaseUser[]
	searchValue: string
}

interface IUseInfiniteUsersQueryResponse {
	users: TypeBaseUser[]
	loading: boolean
	fetchMore: () => Promise<QueryResult<{ users: TypeBaseUser[] }>>
	canFetchMore: boolean
}

export const useInfiniteUsersQuery = ({
	initialUsers,
	searchValue
}: IUseInfiniteUsersQueryProps): IUseInfiniteUsersQueryResponse => {
	const [canLoadMore, setCanLoadMore] = useState<boolean>(
		initialUsers.length === SEARCH_PEOPLE_TAKE.PEOPLE
	)
	const [users, setUsers] = useState<TypeBaseUser[]>(initialUsers)

	const [loadMore, { loading }] = useLazyQuery<{ users: TypeBaseUser[] }>(
		FIND_USERS,
		{
			onCompleted: (data) => {
				
				setUsers(prev => ([...prev, ...data.users]))

				if (data.users.length !== PEOPLE_INCREMENT) setCanLoadMore(false)
			}
		}
	)

	const fetchMore = useCallback(async () => {
		return await loadMore({
			variables: {
				query: {
					take: PEOPLE_INCREMENT,
					skip: users.length,
					searchValue
				}
			}
		})
	}, [users.length, loadMore, searchValue])

	return {
		users,
		canFetchMore: canLoadMore,
		fetchMore,
		loading
	}
}
