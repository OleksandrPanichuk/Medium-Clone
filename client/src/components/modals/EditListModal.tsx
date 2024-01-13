'use client'

import {
	DEFAULT_LIST_NAME,
	MAX_LIST_DESCRIPTION_LENGTH,
	MAX_LIST_NAME_LENGTH
} from '@/shared/config'
import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormLimit,
	FormMessage,
	Input,
	TextareaAutosize
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateListSchema } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateList } from '@/services'
import {  useDisclosure } from '@/hooks'
import { PropsWithChildren, useEffect } from 'react'
import type { TypeListWithCreator } from '@/shared/types'

type TypeFormData = z.infer<typeof updateListSchema>

interface IEditListModalProps {
	list: Omit<TypeListWithCreator, 'createdAt'>
	onFormSubmit: (values: TypeFormData) => void
}

export const EditListModal = ({
	children,
	list,
	onFormSubmit
}: PropsWithChildren<IEditListModalProps>) => {
	const { isOpen, onClose, onToggle } = useDisclosure()


	const form = useForm<TypeFormData>({
		resolver: zodResolver(updateListSchema),
		defaultValues: {
			description: list.description ?? '',
			name: list.name,
			public: !list.public
		},
		mode: 'onBlur'
	})
	
	useEffect(() => {
		form.setValue('name', list.name)
		form.setValue('description', list.description)
		form.setValue('public', !list.public)
	}, [list, form])

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid }
	} = form


	const [updateList] = useUpdateList({
		onCompleted:({list}) => {
			onFormSubmit(list)
			onClose()
			form.reset()
		}
	})

	const onSubmit = (values: TypeFormData) =>
		updateList({
			listId: list.id,
			description: values.description,
			public: !values.public,

			name: values.name
		})

	return (
		<Dialog open={isOpen} onOpenChange={onToggle}>
			<DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
				{children}
			</DialogTrigger>
			<DialogContent onClick={(e) => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle>Edit list</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className={'flex flex-col gap-y-4'}
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormField
							control={control}
							name={'name'}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Name"
											disabled={isSubmitting || list.name === DEFAULT_LIST_NAME}
										/>
									</FormControl>
									<div className="w-full flex items-center justify-between gap-x-2">
										<FormMessage />
										<div />
										<FormLimit
											limit={MAX_LIST_NAME_LENGTH}
											value={field.value}
										/>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<TextareaAutosize
											{...field}
											disabled={isSubmitting}
											className={'max-h-[12.5rem] text-sm overflow-hidden '}
											placeholder="Description"
										/>
									</FormControl>
									<div className="w-full flex items-center justify-between gap-x-2">
										<FormMessage />
										<div />
										<FormLimit
											limit={MAX_LIST_DESCRIPTION_LENGTH}
											value={field.value}
										/>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="public"
							render={({ field }) => (
								<FormItem className="flex gap-x-1 items-center space-y-0">
									<FormControl>
										<Checkbox
											{...field}
											disabled={isSubmitting}
											value={undefined}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Make it private</FormLabel>
								</FormItem>
							)}
						/>
						<DialogFooter className={'gap-y-2'}>
							<Button
								type="button"
								disabled={isSubmitting}
								variant={'outline'}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting || !isValid}>
								Done
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
