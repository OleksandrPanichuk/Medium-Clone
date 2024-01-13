'use client'

import { useAuth } from '@/components/providers'
import {
	Avatar,
	Button,
	buttonVariants,
	Form,
	FormControl,
	FormField,
	FormItem,
	Textarea
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './CreateCommentForm.module.scss'
import { toast } from 'sonner'

import Link from 'next/link'

import { usePostContext } from '@/components/screens/post'
import { cn } from '@/lib'
import { useCreateComment } from '@/services'
import { Routes } from '@/shared/constants'
import { TypePostCommentWithCreator } from '@/shared/types'

const formSchema = z.object({
	comment: z.string().min(1).max(250)
})

type TypeFormData = z.infer<typeof formSchema>

export const CreateCommentForm = () => {
	const {
		post: { id: postId },
		sortBy,
		setComments
	} = usePostContext()
	const { user } = useAuth()

	const form = useForm<TypeFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: ''
		}
	})

	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = form

	const [createComment] = useCreateComment()

	const onSubmit = async (data: TypeFormData) => {
		try {
			form.reset()
			const {data:result} = await createComment({
				variables: {
					input: {
						content: data.comment,
						postId
					}
				}
			})
			if(!result || !user) throw new Error()

			const newComment: TypePostCommentWithCreator = {
				...result.comment,
				creator: user
			}

			if(sortBy === 'createdAt'){ 
				setComments(prev => prev ? [newComment, ...prev] : [newComment])
			} else {
				setComments(prev => prev ? [...prev, newComment] : [newComment])
			}
			
		} catch (err) {
			toast.error('Failed to create comment')
		}
	}

	if (!user) {
		return (
			<Link href={Routes.SIGN_IN} className={cn(buttonVariants(), 'my-2')}>
				Sign in to create a comment
			</Link>
		)
	}

	if(!user?.verified) {
		return <p className={cn(buttonVariants(),'cursor-default w-full my-2')}>Please, verify your email</p>
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.user}>
					<Avatar
						src={user.avatar?.url}
						name={user.username}
						key={user.username}
					/>
					<span>{user.username}</span>
				</div>
				<FormField
					control={control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									{...field}
									className={styles.textarea}
									placeholder="What are you thoughts?"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className={styles.submit}>
					<Button disabled={!isValid} className={styles.button}>
						Respond
					</Button>
				</div>
			</form>
		</Form>
	)
}
