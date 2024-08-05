"use client"
import { TypeTrendingPost } from '@/shared/types'
import { formatIndex } from './TrendingItem.helpers'
import styles from './TrendingItem.module.scss'
import { Avatar, Skeleton } from '@/components/ui'
import { formatDate, toDateString } from '@/lib'
import { Dot } from 'lucide-react'
import { MemberOnly } from '@/components/common'
import Link from 'next/link'
import { Routes } from '@/shared/constants'

interface ITrendingItemProps {
	post: TypeTrendingPost
	index: number
}

export const TrendingItem = ({ post, index }: ITrendingItemProps) => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.position}>{formatIndex(index)}</span>
			<div className={styles.content}>
				<Link
					href={`${Routes.PROFILE}/${post.creator.id}`}
					className={styles.creator}
				>
					<Avatar src={post.creator.avatar?.url} name={post.creator.username} />
					<span>{post.creator.username}</span>
				</Link>
				<h3  className={styles.title}>
					<Link href={`${Routes.POSTS}/${post.id}`} >{post.title}</Link>
					</h3>
				<div className={styles.bottom}>
					<time className={styles.time} dateTime={toDateString(post.createdAt)}>
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
		</div>
	)
}

TrendingItem.Skeleton = function TrendingItemSkeleton({
	index
}: Omit<ITrendingItemProps, 'post'>) {
	return (
		<div className={styles.skeleton}>
			<span className={styles.position}>{formatIndex(index)}</span>
			<div className={styles.skeleton__content}>
				<div className={styles.skeleton__creator}>
					<Avatar isLoading />
					<Skeleton className={styles.skeleton__username} />
				</div>
				<Skeleton className={styles.skeleton__title} />
				<Skeleton className={styles.skeleton__time} />
			</div>
		</div>
	)
}
