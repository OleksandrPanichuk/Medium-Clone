'use client'

import { useLocalStorage } from '@/hooks'
import { RECENT_SEARCHES_KEY } from '@/shared/config'
import styles from './RecentSearches.module.scss'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Routes } from '@/shared/constants'
import { useEffect, useState } from 'react'

export const RecentSearches = () => {
	const [recentSearches, setRecentSearches] =
		useLocalStorage<string[]>(RECENT_SEARCHES_KEY,[])

	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Recent searches</h1>
			{recentSearches?.length && isMounted ? (
				<ul className={styles.list}>
					{recentSearches.map((item) => (
						<li className={styles.item} key={nanoid()}>
							<Link
								className={styles.item__text}
								href={`${Routes.SEARCH}?q=${item}`}
							>
								{item}
							</Link>
							<button
								className={styles.remove}
								onClick={() =>
									setRecentSearches(
										recentSearches?.filter((searchItem) => searchItem !== item)
									)
								}
							>
								<X />
							</button>
						</li>
					))}
				</ul>
			) : (
				<span className={styles.no__searches}>You have no recent searches</span>
			)}
		</div>
	)
}
