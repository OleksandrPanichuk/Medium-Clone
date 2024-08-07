'use client'

import {
	Button,
	Checkbox,
	Container,
	Dialog,
	DialogContent,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEditor } from '../EditorProvider'
import styles from './PublishForm.module.scss'

import { useAuth } from '@/components/providers'
import {
	PreviewImageDropzone,
	TagsSelect
} from '@/components/screens/new-story'
import {
	formSchema,
	IPublishModalProps,
	TypeFormData
} from '@/components/screens/new-story/PublishForm/PublishForm.types'
import { CREATE_POST } from '@/graphql'
import { cn, useCacheManager } from '@/lib'
import { STORY_BLOCKS_COUNT_FOR_PRIVATE_MODE } from '@/shared/config'
import { Routes } from '@/shared/constants'
import { TypeCreatePostResponse } from '@/shared/types'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const PublishForm = ({ onClose, isOpen }: IPublishModalProps) => {
	const { images: attachments, content, isEmpty } = useEditor()
	const cacheManager = useCacheManager()
	
	const form = useForm<TypeFormData>({
		resolver: zodResolver(formSchema),
		mode:'onBlur',
		defaultValues: {
			attachments,
			description: '',
			title: '',
			tags: [],
			image: {
				key: '',
				url: ''
			},
			public: true
		}
	})
	const {
		control,
		handleSubmit,
		formState: { isValid },
		setValue
	} = form

	useEffect(() => {
		setValue('attachments', attachments)
	}, [attachments, setValue])

	const { user } = useAuth()
	const router = useRouter()

	const [createPost, { loading }] = useMutation<TypeCreatePostResponse>(
		CREATE_POST,
		{
			onCompleted: (response) => {
				cacheManager.increaseUserPostsCount()
				form.reset()
				router.push(`${Routes.POSTS}/${response.post.id}`)
			},
			onError: (err) => {
				toast.error(err.message)
			}
		}
	)

	const onSubmit = (data: TypeFormData) =>
		createPost({
			variables: {
				input: {
					...data,
					content: JSON.stringify(content)
				}
			}
		})


	if (!user) return null

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className={styles.content}>
				<Container className={styles.container}>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
							<div className={styles.preview}>
								<FormField
									control={control}
									name="image"
									render={({ field }) => (
										<FormItem>
											<FormLabel className={styles.label}>
												Story Preview
											</FormLabel>
											<FormControl>
												<PreviewImageDropzone loading={loading} field={field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name={'title'}
									render={({ field }) => (
										<FormItem>
											<FormLabel className={styles.label}>Title</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={loading}
													className={styles.title__input}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name={'description'}
									render={({ field }) => (
										<FormItem>
											<FormLabel className={styles.label}>
												Description
											</FormLabel>
											<FormControl>
												<Textarea
													className={styles.description__textarea}
													{...field}
													disabled={loading}
													placeholder="Preview description..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<p className={styles.note}>
									<span>Note:</span> Changes here will affect how your story
									appears in public places like {"Podium's"} homepage and in
									subscribers’ inboxes — not the contents of the story itself.
								</p>
							</div>
							<div className={styles.tags}>
								<p className={styles.publishing__to}>
									Publishing to: <span>{user.username}</span>
								</p>
								<p className={styles.tags__changes}>
									Add or change topics so readers know what your story is about
								</p>
								<FormField
									control={control}
									name={'tags'}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TagsSelect
													loading={loading}
													className={styles.select}
													field={field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name={'public'}
									render={({ field }) => (
										<FormItem>
											<FormLabel className={styles.label}>Public</FormLabel>
											<div className={styles.checkbox__item}>
												<FormControl>
													<Checkbox
														defaultChecked={true}
														checked={field.value}
														onCheckedChange={(e) => field.onChange(e)}
														disabled={
															content?.blocks.length <
																STORY_BLOCKS_COUNT_FOR_PRIVATE_MODE || loading
														}
													/>
												</FormControl>
												<FormDescription className={cn(styles.checkbox__note)}>
													<span>Note:</span>You must have at least{' '}
													{STORY_BLOCKS_COUNT_FOR_PRIVATE_MODE} blocks to make
													this post private
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
								<Button
									className={styles.submit__button}
									type={'submit'}
									disabled={!isValid || isEmpty || loading}
								>
									Publish now
								</Button>
							</div>
						</form>
					</Form>
				</Container>
			</DialogContent>
		</Dialog>
	)
}
