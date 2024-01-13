'use client'
import { TypeListPost } from '@/shared/types'
import { useState } from 'react'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	TextareaAutosize
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn, listDescriptionSchema } from '@/lib'
import { z } from 'zod'
import { useUpdateNote } from '@/services'
import { useListContext } from '@/components/screens/list'
import { useAuth } from '@/components/providers'

interface IPostDescriptionProps {
	post: TypeListPost
}

type TypeFormData = z.infer<typeof listDescriptionSchema>

export const PostDescription = ({ post }: IPostDescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const { list, setPosts, posts } = useListContext()
	const { user } = useAuth()

	const isCurrentUserCreatorOfList = list.creator.id === user?.id

	const form = useForm<TypeFormData>({
		resolver: zodResolver(listDescriptionSchema),
		defaultValues: {
			note: post.note ?? ''
		}
	})

	const [updateNote] = useUpdateNote({
		onCompleted: ({ post: data }) => {
			const newPosts = [...posts].map((item) =>
				item.id === post.id ? { ...item, note: data.note } : item
			)
			setPosts(newPosts)
			setIsEditing(false)
		}
	})

	const onSubmit = async (values: TypeFormData) => {
		await updateNote({ note: values.note, listId: list.id, postId: post.id })
	}

	if (isCurrentUserCreatorOfList && isEditing) {
		return (
			<div className={'pt-2 pb-[1.28px] pl-5 border-l-[3px] border-l-zinc-800'}>
				<Form {...form}>
					<form
						className={'flex gap-x-2 items-start'}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							render={({ field }) => (
								<FormItem className={'flex-1 space-y-0'}>
									<FormControl>
										<TextareaAutosize
											{...field}
											variant={'secondary'}
											className={'italic text-sm font-primary'}
											placeholder={'Write a brief description'}
										/>
									</FormControl>
								</FormItem>
							)}
							name={'note'}
							control={form.control}
						/>
						<button
							className={
								'text-zinc-600 text-sm hover:text-zinc-700 transition-colors'
							}
							disabled={form.formState.isSubmitting}
							type={'button'}
							onClick={() => setIsEditing(false)}
						>
							Cancel
						</button>
						<button
							disabled={form.formState.isSubmitting || !form.formState.isValid}
							className={'text-green-800 text-sm disabled:text-green-500'}
							type={'submit'}
						>
							Done
						</button>
					</form>
				</Form>
			</div>
		)
	}

	if (isCurrentUserCreatorOfList) {
		return (
			<div
				className={cn(
					'pt-2 pl-5 border-l-[3px] pb-2',
					post.note?.trim() ? 'border-l-zinc-800' : 'border-l-zinc-400'
				)}
			>
				<pre
					onClick={() => isCurrentUserCreatorOfList && setIsEditing(true)}
					className={cn(
						'text-sm italic font-primary',
						post.note?.trim() ? 'text-zinc-800' : 'text-zinc-400'
					)}
				>
					{post.note?.trim() ? post.note : 'Add a note...'}
				</pre>
			</div>
		)
	}

	if (post.note?.trim()) {
		return (
			<div className={'pt-2 pb-2 pl-5 border-l-[3px] border-l-zinc-800'}>
				<pre className={'text-sm italic font-primary text-zinc-800'}>
					{post.note}
				</pre>
			</div>
		)
	}

	return null
}
