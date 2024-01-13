import type { TypeFindPostsForTagPageResponse } from '@/shared/types'
import Image from 'next/image'
import { memo } from 'react'
import styles from './PostCard.module.scss'
import { useRouter } from 'next/navigation'
import { formatDate, toDateString } from '@/lib'
import { PostClaps } from '@/components/common'
import { MessageCircle } from 'lucide-react'
import { Avatar } from '@/components/ui'
import { Routes } from '@/shared/constants'

interface IPostCardProps {
	post: TypeFindPostsForTagPageResponse
}

export const PostCard = memo(function PostCard({ post }: IPostCardProps) {
	const router = useRouter()

	const onPostClick = () => router.push(`${Routes.POSTS}/${post.id}`)
	const onCreatorClick = () =>
		router.push(`${Routes.PROFILE}/${post.creator.id}`)
	const onCommentClick = () =>
		router.push(`${Routes.POSTS}/${post.id}?comments=open`)

	return (
		<article>
			<div className={styles.image} onClick={onPostClick}>
				<Image src={post.image.url} alt={post.title} fill />
			</div>
			<div className={styles.create__info}>
				<div className={styles.creator} onClick={onCreatorClick}>
					<Avatar
						className={styles.avatar}
						src={post.creator.avatar?.url}
						name={post.creator.username}
					/>
					<span className={styles.username}>{post.creator.username}</span>
				</div>
				<time className={'post-time'} dateTime={toDateString(post.createdAt)}>
					{formatDate(post.createdAt)}
				</time>
			</div>
			<h2 onClick={onPostClick} className={'post-title'}>
				{post.title}
			</h2>
			<p onClick={onPostClick} className={styles.description}>
				{post.description}
			</p>
			<div className={styles.actions}>
				<PostClaps initialClaps={post.claps} post={post} />
				<button className={styles.comments} onClick={onCommentClick}>
					<MessageCircle />
					<span>{post._count.comments}</span>
				</button>
			</div>
		</article>
	)
})
