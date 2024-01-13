'use client'

import { Bookmark, BookmarkFilled } from '@/components/icons'
import {
	Checkbox,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Separator,
	Skeleton
} from '@/components/ui'
import { useListsQuery } from '@/services'
import { Modals } from '@/shared/constants'
import type { TypeFindPostsResponse } from '@/shared/types'
import { useListsStore, useModalStore } from '@/store'
import { useEffect, useState } from 'react'
import { AddToListItem } from '@/components/common'
import { useAuth } from '@/components/providers'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'

interface IAddToListButtonProps {
	post: TypeFindPostsResponse
	defaultChecked: boolean
	onPostListChange?: (
		post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string
	) => void
}

const AddToListButton = ({
	post,
	defaultChecked,
	onPostListChange
}: IAddToListButtonProps) => {
	const { lists } = useListsStore()
	const {user} = useAuth()
	const { loading } = useListsQuery()

	const [checked, setChecked] = useState<boolean>(defaultChecked)

	const { onOpen } = useModalStore()


	useEffect(() => {
		if (lists?.every((list) => !list.posts.some((item) => item.id === post.id)))
			setChecked(false)
		else setChecked(true)
	}, [lists, post.id])

	const onChange = (
		post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string
	) => {
		onPostListChange?.(post, type, listId)
	}

	const onModalOpen = () => {
		if(!user?.subscribed && lists.length >= SUBSCRIPTION_LIMITS.LISTS)  {
			onOpen(Modals.PRO)
			return
		} 
		onOpen(Modals.CREATE_LIST)
	}

	if(!user) return null

	return (
		<Popover>
			<PopoverTrigger>
				{checked ? <BookmarkFilled /> : <Bookmark />}
			</PopoverTrigger>
			<PopoverContent className={'min-w-[17.5rem] m-2 p-4'}>
				{loading
					? new Array(4).fill(0).map((_, index) => (
							<div key={index}>
								<Checkbox checked={false} aria-readonly />
								<Skeleton className={"w-full h-4"} />
							</div>
					  ))
					: lists?.map((list) => (
							<AddToListItem
								key={list.id}
								list={list}
								post={post}
								onChange={onChange}
							/>
					  ))}
				<Separator className={'my-2'} />
				<button
					className="text-green-700 hover:text-zinc-800 transition-colors  text-sm"
					onClick={onModalOpen}
				>
					Create new list
				</button>
			</PopoverContent>
		</Popover>
	)
}


export default AddToListButton