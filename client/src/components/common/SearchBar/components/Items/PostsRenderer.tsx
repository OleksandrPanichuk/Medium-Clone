import { Separator } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.scss'
import { TypeSearchPost } from '@/shared/types'
import { Routes } from '@/shared/constants'

interface IPostsRendererProps {
	posts: TypeSearchPost[]
}

export const PostsRenderer = ({ posts }: IPostsRendererProps) => {
	if (!posts.length) return null
	return (
		<>
			<h3 className={styles.heading}>Publications</h3>
			<Separator />
			{posts.map((post) => (
				<li className={styles.item} key={post.id}>
					<Link className={'truncate'} href={`${Routes.POSTS}/${post.id}`}>
						<Image
							className={styles.image}
							src={post.image.url}
							alt={post.title}
							width={24}
							height={24}
						/>
						{post.title}
					</Link>
				</li>
			))}
		</>
	)
}
