'use client'
import { Sheet, SheetContent, SheetTrigger, Separator } from '@/components/ui'
import { MessageCircle } from 'lucide-react'
import styles from './Comments.module.scss'
import {
	Comment,
	CreateCommentForm,
	SortBySelect,
	usePostContext
} from '@/components/screens/post'

import { useDisclosure } from '@/hooks'
import { usePostCommentsQuery } from '@/services'
import { useEffect, useState } from 'react'
import { FetchMoreButton } from '@/components/common'

interface ICommentsProps {
	defaultOpen: boolean
}

export const Comments = ({ defaultOpen }: ICommentsProps) => {
	const [isMounted, setIsMounted] = useState(false)
	const { isOpen, onToggle } = useDisclosure(defaultOpen)
	const { post, sortBy, comments } = usePostContext()

	const { loading, fetchMore, canFetchMore } = usePostCommentsQuery({
		postId: post.id,
		sortBy
	})

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return (
			<button className={styles.trigger}>
				<MessageCircle />
				<span>{post._count.comments}</span>
			</button>
		)
	}

	return (
		<Sheet open={isOpen} onOpenChange={onToggle}>
			<SheetTrigger className={styles.trigger}>
				<MessageCircle />
				<span>{post._count.comments}</span>
			</SheetTrigger>
			<SheetContent side={'right'} className={styles.content}>
				<CreateCommentForm />
				<SortBySelect />
				<ul>
					{comments?.map((comment) => (
						<li key={comment.id}>
							<Separator />
							<Comment comment={comment} />
						</li>
					))}
				</ul>
				<FetchMoreButton
					onClick={fetchMore}
					loading={loading}
					canFetchMore={canFetchMore}
				/>
			</SheetContent>
		</Sheet>
	)
}
