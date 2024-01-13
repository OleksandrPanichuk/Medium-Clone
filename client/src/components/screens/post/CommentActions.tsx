'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem
} from '@/components/ui'

import { MoreHorizontal, Trash } from 'lucide-react'
import { usePostContext } from '@/components/screens/post'
import { useDeleteComment } from '@/services'
import { useConfirmModal } from '@/store'


interface ICommentActionsProps {
	commentId: string
}

export const CommentActions = ({ commentId }: ICommentActionsProps) => {
	const { setComments } = usePostContext()
	const { onOpen } = useConfirmModal()

	const [deleteComment] = useDeleteComment(commentId, {
		onCompleted: () => {
			setComments(
				(prev) => prev?.filter((comment) => comment.id !== commentId) ?? null
			)
		}
	})

	const onDelete = () =>
		onOpen({
			onConfirm: deleteComment
		})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className="focus:bg-rose-300 focus:text-rose-800 transition-colors"
					onClick={onDelete}
				>
					<Trash />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
