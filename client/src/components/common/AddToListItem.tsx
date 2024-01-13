'use client'
import { TypeFindManyListForPost, TypeFindPostsResponse } from '@/shared/types'
import { useState } from 'react'
import {
	useAddPostToList,
	useRemovePostFromList
} from '@/services'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui'
import { Lock } from 'lucide-react'
import { useListsStore } from '@/store'
import { useAuth } from '@/components/providers'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'



interface IAddToListItemProps {
	list: TypeFindManyListForPost
	post: TypeFindPostsResponse
	onChange?: (
		post: TypeFindPostsResponse,
		type: 'added' | 'removed',
		listId: string
	) => void
}

export const AddToListItem = ({
	list,
	post,
	onChange
}: IAddToListItemProps) => {
	const {user} = useAuth()
	
	const [checked, setChecked] = useState(
		list.posts.some((item) => item.id === post.id)
	)
	const disabled = !checked && !user?.subscribed && list.posts.length >= SUBSCRIPTION_LIMITS.POSTS_PER_LIST
	
	const { addToList, removeFromList } = useListsStore()

	const [addPostToList] = useAddPostToList({
		onCompleted:() => {
			toast.success(`Post added to list ${list.name}`)
			addToList(post.id, list.id)
			onChange?.(post, 'added', list.id)
		}
	})
	const [removePostFromList] = useRemovePostFromList({
		onCompleted:() => {
			toast.success(`Post removed from list ${list.name}`)
			removeFromList(post.id, list.id)
			onChange?.(post, 'removed', list.id)
		}
	})
	const onCheck = async (checked: boolean) => {
		setChecked(checked)

		if (checked) {
			await addPostToList({
				listId: list.id,
				postId: post.id
			})
		}
		if (!checked) {
			await removePostFromList({
				listId: list.id,
				postId: post.id
			})
		}
	}
	return (
		<label className="flex items-center gap-x-1 cursor-pointer">
			<Checkbox disabled={disabled} aria-disabled={disabled} checked={checked} onCheckedChange={onCheck} />
			<span className="flex-1">{list.name}</span>
			{!list.public && <Lock className="w-4 h-4" />}
		</label>
	)
}
