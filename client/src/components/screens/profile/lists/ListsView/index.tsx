'use client'

import { FetchMoreButton, ReadingListItem } from '@/components/common'
import { useAuth } from '@/components/providers'
import {
	NewListButton,
	useListsContext
} from '@/components/screens/profile/lists'
import { useInfiniteListsQuery } from '@/services'
import styles from './ListsView.module.scss'
import { LISTS_LOADING_SKELETONS_COUNT } from '@/shared/config'

interface IListsViewProps {
	userId: string
}

export const ListsView = ({ userId }: IListsViewProps) => {
	const { user: currentUser } = useAuth()
	const {
		lists,
		onListDescriptionChange,
		onListNameChange,
		onListStatusChange,
		onListDelete,
		setLists
	} = useListsContext()

	const { canFetchMore, fetchMore, loading } = useInfiniteListsQuery({
		creatorId: userId,
		initialLists:lists,
		mode:'withArray',
		onCompleted:(data) => setLists((prev) => [...prev, ...data.lists])
	})

	const fakeArray = new Array(LISTS_LOADING_SKELETONS_COUNT).fill(0)

	return (
		<div className={styles.wrapper}>
			{currentUser?.id === userId && <NewListButton />}
			{lists.map((list) => (
				<ReadingListItem
					onListDescriptionChange={onListDescriptionChange}
					onListNameChange={onListNameChange}
					onListStatusChange={onListStatusChange}
					onListDelete={onListDelete}
					data={list}
					key={list.id}
				/>
			))}

			{loading && (
				<div className={'relative flex flex-col gap-y-4 overflow-auto'}>
					{fakeArray.map((_, index) => (
						<ReadingListItem.Skeleton key={index} />
					))}
				</div>
			)}
			<FetchMoreButton onClick={fetchMore} loading={loading} canFetchMore={canFetchMore} />
		</div>
	)
}
