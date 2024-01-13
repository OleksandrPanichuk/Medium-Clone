import { TypeSearchResponse } from '@/shared/types'
import { ArrowUpRight, Compass } from 'lucide-react'
import Link from 'next/link'

import styles from './ExploreTopics.module.scss'
import { Routes } from '@/shared/constants'

interface IExploreTopicsProps {
	searchValue: string
	debouncedSearchValue: string
	data: TypeSearchResponse | undefined
}

export const ExploreTopics = ({
	searchValue,
	debouncedSearchValue,
	data
}: IExploreTopicsProps) => {
	return (
		<>
			{(!debouncedSearchValue ||
				!searchValue ||
				(data &&
					!data?.posts.length &&
					!data?.tags.length &&
					!data?.users.length)) && (
				<li className={styles.explore__topics}>
					<Link  href={Routes.EXPLORE_TOPICS}>
						<Compass />
						<span>Explore Topics</span>
						<ArrowUpRight />
					</Link>
				</li>
			)}
		</>
	)
}
