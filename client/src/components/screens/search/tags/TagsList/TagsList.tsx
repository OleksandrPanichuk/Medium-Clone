'use client'
import styles from './TagsList.module.scss'
import { TypeTag } from '@/shared/types'
import { useInfiniteTagsQuery } from '@/services'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Routes } from '@/shared/constants'
import { FetchMoreButton } from '@/components/common'

interface ITagsListProps {
	initialTags: TypeTag[]
}

export const TagsList = ({ initialTags }: ITagsListProps) => {
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q') as string
	const { tags, fetchMore, canFetchMore, loading } = useInfiniteTagsQuery({
		initialTags,
		searchValue
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.list}>
				{tags.map((tag) => (
					<Link
						className={'tag-wrapper'}
						key={tag.id}
						href={`${Routes.TAG}/${tag.name}`}
					>
						{tag.name}
					</Link>
				))}
			</div>

			<FetchMoreButton onClick={fetchMore} canFetchMore={canFetchMore} loading={loading} />
		</div>
	)
}
