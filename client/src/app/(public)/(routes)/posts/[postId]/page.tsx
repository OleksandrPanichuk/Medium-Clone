import { getPostById, getPostClaps } from '@/services'
import { PostClaps } from '@/components/common'
import { Comments, Content, PostActions, PostProvider } from '@/components/screens/post'
import { Avatar, Container, Scroll, Separator } from '@/components/ui'
import { formatDate } from '@/lib'
import Image from 'next/image'
import Link from 'next/link'

import { notFound } from 'next/navigation'
import { AddToListButton } from '@/components/common'
import { constructMetadata } from '@/shared/metadata/post'

import styles from './page.module.scss'
interface IPageProps {
	params: {
		postId: string
	}
	searchParams?: {
		comments?: string
	}
}

export async function generateMetadata({params}:IPageProps) {
	const post = await getPostById(params.postId);
	return constructMetadata({post})
}

const Page = async ({ params, searchParams }: IPageProps) => {
	const post = await getPostById(params.postId)

	if (!post) notFound()

	const claps = await getPostClaps(post.id)

	return (
		<PostProvider post={post}>
			<Container className={styles.container}>
				<div className="relative h-96">
					<Image
						src={post.image.url}
						alt={post.title}
						className="object-contain"
						fill
					/>
				</div>
				<h1 className={styles.title}>{post.title}</h1>

				<div className={styles.info}>
					<Link className={styles.avatar} href={`/profile/${post.creator.id}`}>
						<Avatar
							name={post.creator.username}
							src={post.creator.avatar?.url}
						/>
					</Link>
					<div className={styles.info__inner}>
						<p className={styles.username}>
							<Link href={`/profile/${post.creator.id}`}>
								{post.creator.username}
							</Link>
						</p>
						<span className={styles.creation_date}>
							Created: {formatDate(post.createdAt)}
						</span>
					</div>
				</div>

				<Separator className="mt-2" />
				<div className={styles.actions}>
					<PostClaps initialClaps={claps} post={post} />

					<Comments defaultOpen={searchParams?.comments === 'open'} />

					<div className="flex-1" />
					<AddToListButton post={post} defaultChecked={post._count.lists > 0} />
					<PostActions />
				</div>
				<Separator className="mb-8" />

				<Content post={post}/>
				<Scroll>
					{post.tags.map(({ tag }) => (
						<Link
							className={'tag-wrapper'}
							
							href={`/tag/${tag.name}`}
							key={tag.id}
						>
							{tag.name}
						</Link>
					))}
				</Scroll>
			</Container>
		</PostProvider>
	)
}

export default Page
