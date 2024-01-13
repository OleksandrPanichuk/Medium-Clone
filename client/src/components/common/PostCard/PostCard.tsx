'use client'
import { TypeFindPostsResponse } from '@/shared/types'
import styles from './PostCard.module.scss'
import { Dot } from 'lucide-react'
import { MemberOnly, AddToListButton } from '@/components/common'
import { Avatar, Skeleton } from '@/components/ui'
import { cn, formatDate, toDateString } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { memo, NamedExoticComponent } from 'react'
import { Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'

interface IPostCardProps {
	post: TypeFindPostsResponse
	onPostListChange?: (
		post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string
	) => void
}

type TypePostCard = NamedExoticComponent<IPostCardProps> & {
	Skeleton: () => JSX.Element
}

//@ts-ignore
const PostCard: TypePostCard = memo(function Component({
	post,
	onPostListChange
}: IPostCardProps) {
	const router = useRouter()
	const {user} = useAuth()

	const navigateToPost = () => router.push(`${Routes.POSTS}/${post.id}`)

	return (
		<article className='my-2'>
			<div className={styles.top}>
				<div className={styles.content}>
					<div className={styles.header}>
						<Link
							className={styles.creator}
							href={`${Routes.PROFILE}/${post.creator.id}`}
						>
							<Avatar
								src={post.creator.avatar?.url}
								name={post.creator.username}
							/>
							<span>{post.creator.username}</span>
						</Link>
						<Dot className={styles.dot} />
						<time
							className={cn('post-time', styles.time)}
							onClick={navigateToPost}
							dateTime={toDateString(post.createdAt)}
						>
							{formatDate(post.createdAt)}
						</time>
						{!post.public && <MemberOnly />}
					</div>
					<h2
						className={cn('post-title', styles.title)}
						onClick={navigateToPost}
					>
						{post.title}
					</h2>
					<p onClick={navigateToPost} className={styles.description}>
						{post.description}
					</p>
				</div>
				<div className={styles.image} onClick={navigateToPost}>
					<Image src={post.image.url} fill alt={post.title} />
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.tags}>
					{[...post.tags].splice(0, 4).map(({ tag }) => (
						<Link
							className={'tag-wrapper'}
							href={`/tag/${tag.name}`}
							key={tag.id}
						>
							{tag.name}
						</Link>
					))}
				</div>

				{Boolean(user) && <AddToListButton onPostListChange={onPostListChange} post={post} defaultChecked={post?._count?.lists > 0} />}
			</div>
		</article>
	)
}) 

PostCard.Skeleton = function PostCardSkeleton() {
	return (
		<div className={styles.skeleton}>
			<div className={styles.skeleton__content}>
				<div className={styles.skeleton__header}>
					<Skeleton className={styles.skeleton__avatar} />
					<Skeleton className={styles.skeleton__username} />
					<Dot className={styles.dot} />
					<Skeleton className={styles.skeleton__time} />
				</div>
				<Skeleton className={styles.skeleton__title} />
				<Skeleton className={styles.skeleton__description} />
				<div className={styles.skeleton__tags}>
					<Skeleton className={styles.skeleton__tag} />
					<Skeleton className={styles.skeleton__tag} />
				</div>
			</div>
			<Skeleton className={styles.skeleton__image} />
		</div>
	)
}

export default PostCard
