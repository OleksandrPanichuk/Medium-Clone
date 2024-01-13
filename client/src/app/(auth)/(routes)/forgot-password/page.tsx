'use client'
import { SEND_RESET_PASSWORD_LINK } from '@/graphql'
import { emailSchema } from '@/lib'
import { RESET_PASSWORD_LINK_BASE } from '@/shared/config'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
	Input,
	Button
} from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'
import { ChevronLeft } from 'lucide-react'

import styles from './page.module.scss'

type TypeFormData = z.infer<typeof emailSchema>

const Page = () => {
	const form = useForm<TypeFormData>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: ''
		},
		mode: 'onBlur'
	})
	const { control, handleSubmit } = form
	const [sendForgetPasswordLink, { loading }] = useMutation<{ result: string }>(
		SEND_RESET_PASSWORD_LINK,
		{
			onCompleted: (data) => {
				form.reset()
				toast.info(data.result)
			},
			onError: (error) => {
				toast.error(error.message)
			}
		}
	)

	const onSubmit = (values: TypeFormData) => {
		sendForgetPasswordLink({
			variables: {
				input: {
					...values,
					link: RESET_PASSWORD_LINK_BASE
				}
			}
		})
	}
	return (
		<div className={styles.wrapper}>
			<Form {...form}>
				<form className={styles.inner} onSubmit={handleSubmit(onSubmit)}>
					<h2 className={styles.title}>Forgot Password</h2>
					<p className={styles.description}>
						Enter your email and we&apos;ll send you a link to reset your
						password
					</p>
					<FormField
						control={control}
						name={'email'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										variant={'form'}
										disabled={loading}
										type={'email'}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className={'w-full'} disabled={loading} type={'submit'}>
						Submit
					</Button>
					<div className={styles['login-button']}>
						<Link
							className={styles['login-button__link']}
							href={Routes.SIGN_IN}
						>
							<ChevronLeft />
							<span>Back to Login</span>
						</Link>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Page
