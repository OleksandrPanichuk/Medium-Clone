'use client'
import {
	Popover,
	PopoverContent,
	PopoverInput,
	Skeleton
} from '@/components/ui'
import styles from './TopicsSearch.module.scss'
import { FileText, Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from '@/hooks'
import { formatNumber } from '@/lib'
import { useTopicsSearchQuery } from '@/services'
import { Routes } from '@/shared/constants'
import Link from 'next/link'

export const TopicsSearch = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearchValue = useDebounce(searchValue, 300)

	const { data, loading} = useTopicsSearchQuery(debouncedSearchValue, searchValue)

	return (
		<Popover canOpen={!!debouncedSearchValue} className={styles.wrapper}>
			<PopoverInput
				wrapperClassName={styles.input}
				onChange={(event) => setSearchValue(event.target.value)}
				iconLeft={<Search className={styles.search__icon} />}
				placeholder="Search all topics"
			/>
			<PopoverContent className={styles.content}>
				{loading ? (
					<TopicsSearch.Skeleton />
				) : !!data?.tags.length ? (
					data.tags.map((tag) => (
						<Link
							href={`${Routes.TAG}/${tag.name}`}
							key={tag.id}
							className={styles.tag}
						>
							<FileText className={styles.icon} />
							<span className="flex-1">{tag.name}</span>
							<span>{formatNumber(tag._count.posts)}</span>
						</Link>
					))
				) : (
					<span>Nothing found</span>
				)}
			</PopoverContent>
		</Popover>
	)
}

TopicsSearch.Skeleton = function TopicsSearchSkeleton() {
	const fakeArray = Array(6).fill(0)

	return (
		<>
			{fakeArray.map((_, index) => (
				<div key={index} className={styles.skeleton}>
					<FileText className={styles.icon} />
					<Skeleton className={styles.skeleton__name} />
					<Skeleton className={styles.skeleton__count} />
				</div>
			))}
		</>
	)
}
