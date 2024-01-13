'use client'

import { FetchMoreButton, ReadingListItem } from '@/components/common'
import { Separator } from '@/components/ui'
import { useInfiniteListsQuery } from '@/services'
import { LISTS_LOADING_SKELETONS_COUNT, SEARCH_LISTS_TAKE } from '@/shared/config'
import { TypeFindManyList } from '@/shared/types'
import { Fragment } from 'react'

import styles from './ListsView.module.scss'
import { useSearchParams } from 'next/navigation'

interface IListsViewProps {
	initialLists: TypeFindManyList[]
}

export const ListsView = ({ initialLists }: IListsViewProps) => {
	const searchParams = useSearchParams()
	const { data, canFetchMore, fetchMore, loading } = useInfiniteListsQuery({
		initialLists,
		variables: {
			withoutCurrentUserLists: true,
			searchValue:searchParams.get('q')
		},
		initialLimit:SEARCH_LISTS_TAKE.LISTS,
		
	})
	const fakeArray = new Array(LISTS_LOADING_SKELETONS_COUNT).fill(0)
	return (
		<div className={styles.wrapper}>
			{data.map((list) => (
				<Fragment key={list.id}>
					<ReadingListItem
						canChangeIfCreator={false}
						data={list}
						key={list.id}
					/>
					<Separator />
				</Fragment>
			))}
			{loading && (
				<>
					{fakeArray.map((_, index) => (
						<Fragment key={index}>
							<ReadingListItem.Skeleton />
							<Separator />
						</Fragment>
					))}
				</>
			)}
			<FetchMoreButton
				onClick={fetchMore}
				canFetchMore={canFetchMore}
				loading={loading}
			/>
		</div>
	)
}
