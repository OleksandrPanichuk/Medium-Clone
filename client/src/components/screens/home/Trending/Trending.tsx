'use client'

import { useTrendingPostsQuery } from '@/services'
import { TRENDING_POSTS_COUNT } from '@/shared/config'
import { TrendingItem } from '@/components/screens/home'

import styles from './Trending.module.scss'
import { TrendingIcon } from '@/components/icons'

export const Trending = () => {
	const { data, loading } = useTrendingPostsQuery()

	if (loading) {
		return <Trending.Skeleton />
	}

	if (!data?.posts) return null

	return (
		<section className={styles.trending}>
			<div className={styles.trending__head}>
				<TrendingIcon />
				<h2 className={styles.trending__heading}>Trending on Medium</h2>
			</div>
			<div className={styles.trending__content}>
				{data?.posts.map((post, index) => (
					<TrendingItem index={index + 1} post={post} key={post.id} />
				))}
			</div>
		</section>
	)
}

Trending.Skeleton = function TrendingSkeleton() {
	const fakeArray = new Array(TRENDING_POSTS_COUNT).fill(0)
	return (
		<div className={styles.skeleton}>
			<div className={styles.trending__head}>
				<TrendingIcon />
				<h2 className={styles.trending__heading}>Trending on Medium</h2>
			</div>
			<div className={styles.skeleton__content}>
				{fakeArray.map((_, index) => (
					<TrendingItem.Skeleton index={index + 1} key={index} />
				))}
			</div>
		</div>
	)
}
