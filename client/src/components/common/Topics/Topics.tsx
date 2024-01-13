"use client"
import { Scroll } from '@/components/ui'

import styles from './Topics.module.scss'
import { Compass } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib'

import { TAGS_TAKE_LIMIT } from '@/shared/config'
import { useTagsQuery } from '@/services'
import { Routes } from '@/shared/constants'
import { usePathname } from 'next/navigation'

interface ITopicsProps {
	selectedTag?: string
}

export const Topics =  ({ selectedTag }: ITopicsProps) => {
	const { data } = useTagsQuery({ take: TAGS_TAKE_LIMIT, sortBy:'posts', sortOrder:'desc' })
	const pathname = usePathname()
	
	return (
		<Scroll>
			<Link
				className={cn(
					styles.item,
					pathname?.endsWith(Routes.EXPLORE_TOPICS) && styles.active
				)}
				href={Routes.EXPLORE_TOPICS}
			>
				<Compass />
				<span className="hidden md:inline">Explore topics</span>
			</Link>
			{data?.tags &&
				data?.tags.map((tag) => (
					<Link
						href={`${Routes.TAG}/${tag.name}`}
						className={cn(
							styles.item,
							selectedTag === tag.name && styles.active
						)}
						key={tag.id}
					>
						{tag.name}
					</Link>
				))}
		</Scroll>
	)
}
