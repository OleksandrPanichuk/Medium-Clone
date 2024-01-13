'use client'
import { useModalStore } from '@/store'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	TextareaAutosize
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileSchema } from '@/lib'
import { z } from 'zod'
import { useAuth } from '@/components/providers/AuthProvider'
import { useUpdateAvatar, useUpdateUser } from '@/services'
import { Modals } from '@/shared/constants'
import { ChangeAvatarButton } from '@/components/common'
import { useEffect } from 'react'

type TypeFormData = z.infer<typeof editProfileSchema> & {
	file?: File
}

export const EditProfileModal = () => {
	const { isOpen, type, onClose } = useModalStore()
	const { user } = useAuth()

	const form = useForm<TypeFormData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			about: user?.about,
			username: user?.username
		}
	})

	const {
		handleSubmit,
		control,
		setValue,
		formState: { isSubmitting, isValid, isDirty }
	} = form

	const [updateAvatar] = useUpdateAvatar()

	const [updateUser] = useUpdateUser({
		onCompleted: () => {
			onClose()
			window.location.reload()
		}
	})

	const onSubmit = async (data: TypeFormData) => {
		const dataToUpdate: Partial<Omit<TypeFormData, 'file'>> = {
			...(data.about !== user?.about && { about: data.about }),
			username: data.username
		}

		const file = form.getValues('file')
		if (file) {
			await updateAvatar(file)
		}

		await updateUser(dataToUpdate)
	}

	useEffect(() => {
		if(user?.about) {
			setValue('about',user.about)
		}
	}, [user?.about, setValue])
	
	if (type !== Modals.EDIT_PROFILE) return null

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			<DialogContent className={'overflow-auto h-[65%] my-4 scrollbar'}>
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>Tell the world about yourself</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						className={'flex flex-col gap-y-4'}
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormField
							control={control}
							name={'file'}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ChangeAvatarButton field={field} disabled={isSubmitting} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={'username'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username:</FormLabel>
									<FormControl>
										<Input {...field} disabled={isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={'about'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>About:</FormLabel>
									<FormControl>
										<TextareaAutosize {...field} disabled={isSubmitting} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type={'button'} onClick={onClose} variant={'outline'}>
								Cancel
							</Button>
							<Button disabled={!isDirty || isSubmitting || !isValid}>
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
