'use client'
import { TypeBasePost } from '@/shared/types'
import styles from '../Sidebar.module.scss'
import { Avatar, Separator } from '@/components/ui'
import { cn, formatDate, toDateString } from '@/lib'
import { Dot } from 'lucide-react'
import { MemberOnly } from '@/components/common'
import Link from 'next/link'
import { useSidebarNavigate } from '../hooks'
import { Routes } from '@/shared/constants'

interface IPostsProps {
	searchValue: string
	posts: Omit<TypeBasePost, 'description'>[]
}

export const Posts = ({ posts, searchValue }: IPostsProps) => {
	const navigate = useSidebarNavigate()
	return (
		<section className={styles.result}>
			<h4 className={styles.result__type}>
				Posts matching <span>{searchValue}</span>
			</h4>
			{posts.map((post) => (
				<div key={post.id} className={styles.post}>
					<div
						className={styles['post-creator']}
						onClick={() => navigate('people', post.creator.id)}
					>
						<Avatar
							className={styles['post-creator__avatar']}
							src={post.creator.avatar?.url}
							name={post.creator.username}
						/>
						<span className={styles['post-creator__username']}>
							{post.creator.username}
						</span>
					</div>
					<h5
						onClick={() => navigate('posts', post.id)}
						className={cn('post-title', styles.post__title)}
					>
						{post.title}
					</h5>
					<div>
						<time
							onClick={() => navigate('posts', post.id)}
							className={styles.post__time}
							dateTime={toDateString(post.createdAt)}
						>
							{formatDate(post.createdAt)}
						</time>
						{!post.public && (
							<>
								<Dot />
								<MemberOnly />
							</>
						)}
					</div>
				</div>
			))}
			<Link
				className={styles.see__all}
				href={`${Routes.SEARCH_POSTS}?q=${searchValue}`}
			>
				See all
			</Link>
			<Separator />
		</section>
	)
}
