'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'
import { useDeletePost } from '@/services'
import { Copy, CopyCheck, MoreHorizontal, Trash } from 'lucide-react'
import { usePostContext } from '@/components/screens/post'
import { useConfirmModal } from '@/store'
import { toast } from 'sonner'
import { absolutePath } from '@/lib'
import { Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'

export const PostActions = () => {
	const { post } = usePostContext()
	const {onOpen} = useConfirmModal()
	const [deletePost] = useDeletePost(post.id)
	const {user} = useAuth()


	const onCopy = async () => {
		await navigator.clipboard.writeText(
			absolutePath(
				`${Routes.POSTS}/${post.id}`
			)
		)
		toast.success('Copied to clipboard', { icon: <CopyCheck /> })
	}

	const onDelete = () => onOpen({
		description:`This action cannot be undone. This will permanently delete story "${post.title}".`,
		onConfirm:deletePost
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
			<DropdownMenuItem className={'gap-x-2'} onClick={onCopy}>
					<Copy />
					Copy link
				</DropdownMenuItem>
				
				{user?.id === post.creator.id && (
					<DropdownMenuItem className={'focus:bg-rose-300 focus:text-rose-800 transition-colors gap-x-2'} onClick={onDelete}>
					<Trash />
					Delete
				</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
