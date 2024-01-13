'use client'
import { useAuth } from '@/components/providers'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	TextareaAutosize
} from '@/components/ui'
import { aboutUserSchema } from '@/lib'
import { useUpdateUser } from '@/services'
import { useProfileStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type TypeAboutFormData = z.infer<typeof aboutUserSchema>

export const AboutForm = () => {
	const { user } = useAuth()
	const form = useForm<TypeAboutFormData>({
		resolver: zodResolver(aboutUserSchema),
		defaultValues: {
			about: user?.about ?? ''
		}
	})

	const { disableEditing } = useProfileStore()

	const {
		handleSubmit,
		control,
		formState: { isValid, isSubmitting }
	} = form

	const [updateUser] = useUpdateUser({
		onCompleted: disableEditing
	})

	const onSubmit = (data: TypeAboutFormData) => updateUser(data)

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormField
					control={control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<TextareaAutosize variant={'secondary'} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex w-full items-center justify-end gap-x-4">
					<Button
						onClick={disableEditing}
						disabled={isSubmitting}
						type={'button'}
						variant={'outline'}
					>
						Cancel
					</Button>
					<Button disabled={!isValid || isSubmitting} type="submit">
						Save
					</Button>
				</div>
			</form>
		</Form>
	)
}
