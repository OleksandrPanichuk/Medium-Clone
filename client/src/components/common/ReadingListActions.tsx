'use client'
import { TypeListWithCreator } from '@/shared/types'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	dropdownMenuItemClassName,
	DropdownMenuTrigger
} from '@/components/ui'
import {
	Copy,
	CopyCheck,
	Edit,
	Lock,
	MoreHorizontal,
	Share,
	Trash
} from 'lucide-react'
import { Routes } from '@/shared/constants'
import { toast } from 'sonner'
import { DEFAULT_LIST_NAME } from '@/shared/config'
import {
	useUpdateList,
	useDeleteList
} from '@/services'
import { absolutePath, cn, updateListSchema } from '@/lib'
import { EditListModal } from '@/components/modals'
import { z } from 'zod'
import { useAuth } from '@/components/providers'
import { useConfirmModal } from '@/store'

interface IReadingListActionsProps {
	list: Omit<TypeListWithCreator, 'createdAt'>
	onListDescriptionChange?: (newDescription: string, listId: string) => void
	onListStatusChange?: (newStatus: boolean, listId: string) => void
	onListNameChange?: (newName: string, listId: string) => void
	onListDelete?: (listId: string) => void
}

export const ReadingListActions = ({
	onListStatusChange,
	onListDescriptionChange,
	onListNameChange,
	onListDelete,
	list
}: IReadingListActionsProps) => {
	const { user: currentUser } = useAuth()

	const { onOpen } = useConfirmModal()

	const onCopy = async () => {
		await navigator.clipboard.writeText(
			absolutePath(
				`${Routes.PROFILE}/${list.creator.id}/${Routes.LISTS}/${list.id}`
			)
		)
		toast.success('Copied to clipboard', { icon: <CopyCheck /> })
	}

	const onListEdit = (values: z.infer<typeof updateListSchema>) => {
		onListNameChange?.(values.name!, list.id)
		onListDescriptionChange?.(values.description ?? '', list.id)
		onListStatusChange?.(values.public!, list.id)
	}

	const [deleteList] = useDeleteList(list.id, {
		onCompleted: () => {
			onListDelete?.(list.id)
		}
	})
	const [updateList] = useUpdateList({
		onCompleted:({list}) => {
			onListStatusChange?.(list.public, list.id)
		}
	})

	const onDelete = async () => {
		onOpen({
			description: `This action cannot be undone. This will permanently delete list "${list.name}".`,
			onConfirm:deleteList
		})
	}

	const togglePublic = async () => await updateList({
			listId: list.id,
			public: !list.public
		})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				onClick={(e) => e.stopPropagation()}
				className={
					'focus-visible:outline-none text-zinc-600 hover:text-zinc-900 transition-colors '
				}
			>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				onClick={(e) => e.stopPropagation()}
				className="mx-2"
			>
				<DropdownMenuItem className={'gap-x-2'} onClick={onCopy}>
					<Copy />
					Copy link
				</DropdownMenuItem>

				{list.creator.id === currentUser?.id && (
					<>
						<EditListModal list={list} onFormSubmit={onListEdit}>
							<div className={cn(dropdownMenuItemClassName, 'gap-x-2')}>
								<Edit />
								Edit list info
							</div>
						</EditListModal>

						<DropdownMenuItem className={' gap-x-2'} onClick={togglePublic}>
							{list.public ? (
								<>
									<Lock />
									Make list private
								</>
							) : (
								<>
									<Share />
									Make list public
								</>
							)}
						</DropdownMenuItem>
						{list.name !== DEFAULT_LIST_NAME && (
							<DropdownMenuItem
								className={
									' gap-x-2 focus:bg-rose-300 focus:text-rose-800 transition-colors'
								}
								onClick={onDelete}
							>
								<Trash />
								Delete list
							</DropdownMenuItem>
						)}
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
