'use client'

import { useListsStore, useModalStore } from '@/store'
import { Modals } from '@/shared/constants'
import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
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
import { z } from 'zod'
import { createListSchema } from '@/lib'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateList } from '@/services'
import { toast } from 'sonner'
import {
	MAX_LIST_DESCRIPTION_LENGTH,
	MAX_LIST_NAME_LENGTH
} from '@/shared/config'

type TypeFormData = z.infer<typeof createListSchema>

export const CreateListModal = () => {
	const { onClose, isOpen, type, data: modalData } = useModalStore()
	const { setLists } =useListsStore()

	const form = useForm<TypeFormData>({
		resolver: zodResolver(createListSchema),
		defaultValues: {
			name: '',
			public: false
		}
	})
	const {
		handleSubmit,
		watch,
		control,
		formState: { isValid }
	} = form

	const description = watch('description')


	const [createList, {loading: isSubmitting}] = useCreateList({
		onCompleted: ({list}) => {
			onClose()
			modalData?.onSubmit?.(list)
			setLists(prev => ([...prev, {...list, posts:[]}]))

			form.reset()
			toast.success('List created')
		}
	})

	const onSubmit = (values: TypeFormData) => createList(values)

	const onCancel = () => {
		form.reset()
		onClose()
	}

	if (type !== Modals.CREATE_LIST) return null

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new list</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className={'space-y-2'} onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name={'name'}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isSubmitting}
											placeholder={'Give it a name'}
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
						{typeof description === 'undefined' ? (
							<button
								className={
									'text-green-700 hover:text-zinc-800 transition-colors text-sm '
								}
								type={'button'}
								onClick={() => form.setValue('description', '')}
							>
								Add a description
							</button>
						) : (
							<FormField
								control={control}
								name={'description'}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextareaAutosize
												{...field}
												placeholder={'Description'}
												disabled={isSubmitting}
												className={'max-h-[12.5rem] text-sm overflow-hidden '}
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
						)}
						<FormField
							control={control}
							name={'public'}
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
									<FormLabel>Make it public</FormLabel>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={isSubmitting}
								variant={'outline'}
								type={'button'}
								onClick={onCancel}
							>
								Cancel
							</Button>
							<Button type={'submit'} disabled={isSubmitting || !isValid}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
