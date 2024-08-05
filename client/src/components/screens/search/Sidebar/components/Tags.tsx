'use client'
import type { TypeTag } from '@/shared/types'
import styles from '../Sidebar.module.scss'
import { useSidebarNavigate } from '../Sidebar.hooks'
import { Separator } from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'

interface ITagsProps {
	searchValue: string
	tags: TypeTag[]
}

export const Tags = ({ searchValue, tags }: ITagsProps) => {
	const navigate = useSidebarNavigate()
	return (
		<section className={styles.result}>
			<h4 className={styles.result__type}>
				Topics matching <span>{searchValue}</span>
			</h4>
			<ul className={styles.tags}>
				{tags.map((tag) => (
					<li
						key={tag.id}
						className={'tag-wrapper'}
						onClick={() => navigate('tags', tag.name)}
					>
						{tag.name}
					</li>
				))}
			</ul>
			<Link
				className={styles.see__all}
				href={`${Routes.SEARCH_TAGS}?q=${searchValue}`}
			>
				See all
			</Link>
			<Separator />
		</section>
	)
}
