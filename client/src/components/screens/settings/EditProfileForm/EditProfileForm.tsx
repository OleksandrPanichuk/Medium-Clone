'use client'

import { ChangeAvatarButton } from '@/components/common'
import { useAuth } from '@/components/providers'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	TextareaAutosize
} from '@/components/ui'
import { useClickOutside } from '@/hooks'
import { editProfileSchema } from '@/lib'
import { useUpdateAvatar, useUpdateUser } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './EditProfileForm.module.scss'

import { Loader2 } from 'lucide-react'

type TypeFormData = z.infer<typeof editProfileSchema> & {
	file?: File
}

export const EditProfileForm = () => {
	const { user } = useAuth()
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const formRef = useRef<HTMLFormElement>(null)

	useClickOutside(formRef, () => {
		setIsEditing(false)
		form.reset()
	})

	const form = useForm<TypeFormData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			about: user?.about ?? '',
			username: user?.username
		}
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid }
	} = form

	const [updateAvatar] = useUpdateAvatar()

	const [updateUser] = useUpdateUser({
		onCompleted: () => {
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

	return (
		<Form {...form}>
			<form
				className={'w-full flex flex-col gap-y-4'}
				ref={formRef}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={'flex justify-start'}>
					<FormField
						control={control}
						name={'file'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<ChangeAvatarButton
										className={styles.avatar}
										field={field}
										disabled={isSubmitting || !isEditing}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name={'username'}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username:</FormLabel>
							<FormControl>
								<Input
									{...field}
									variant={'form'}
									disabled={isSubmitting || !isEditing}
								/>
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
								<TextareaAutosize
									{...field}
									disabled={isSubmitting || !isEditing}
									variant={'form'}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className={'w-full flex justify-end'}>
					{isEditing ? (
						<Button className={'flex items-center gap-x-1'} disabled={isSubmitting || !isValid}>	
							{isSubmitting && <Loader2 className={'animate-spin'} />}
							Save
						</Button>
					) : (
						<Button
							type={'button'}
							onClick={(e) => {
								e.preventDefault()
								setIsEditing(true)
							}}
						>
							Edit
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
