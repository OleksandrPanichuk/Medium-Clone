'use client'

import { TypePostCommentWithCreator } from '@/shared/types'
import styles from './Comment.module.scss'
import { Avatar } from '@/components/ui'
import { formatDate } from '@/lib'
import Link from 'next/link'
import { CommentActions } from '@/components/screens/post'
import { useAuth } from '@/components/providers'
import { ClapIcon } from '@/components/icons'
import { useMutation } from '@apollo/client'
import { UPDATE_POST_COMMENT_CLAPS } from '@/graphql'
import { MouseEvent, memo, useState } from 'react'
import { Routes } from '@/shared/constants'

interface ICommentProps {
	comment: TypePostCommentWithCreator
}

export const Comment = memo(
	({ comment: { creator, content, createdAt, ...comment } }: ICommentProps) => {
		const [claps, setClaps] = useState<number>(comment.claps)
		const { user } = useAuth()

		const [incrementClaps] = useMutation(UPDATE_POST_COMMENT_CLAPS, {
			variables: {
				input: {
					commentId: comment.id
				}
			},
			optimisticResponse: () => setClaps((prev) => (prev += 1)),
			onError: () => setClaps((prev) => (prev -= 1))
		})

		const onClick = (event: MouseEvent<HTMLButtonElement>) => {
			;(event.target as HTMLElement)
				.closest(`.${styles.claps}`)
				?.classList.add(styles.claps_active)
			incrementClaps()

			setTimeout(() => {
				;(event.target as HTMLElement)
					.closest(`.${styles.claps}`)
					?.classList.remove(styles.claps_active)
			}, 500)
		}

		return (
			<div className={styles.comment}>
				<div className={styles.creator}>
					<Avatar src={creator?.avatar?.url} name={creator.username} />
					<div className={styles.info}>
						<Link
							className={styles.username}
							href={`${Routes.PROFILE}/${creator.id}`}
						>
							{creator.username}
						</Link>
						<span className={styles.date}>{formatDate(createdAt)}</span>
					</div>
					{user?.id === creator.id && <CommentActions commentId={comment.id} />}
				</div>
				<p className={styles.text}>{content}</p>
				<div>
					<button onClick={onClick} className={styles.claps}>
						<ClapIcon width="1.5rem" height="1.5rem" className={styles.icon} />
						{!!claps && <span>{claps}</span>}
					</button>
				</div>
			</div>
		)
	}
)
Comment.displayName = 'Comment'
