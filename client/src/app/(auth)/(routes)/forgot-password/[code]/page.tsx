'use client'

import { Loading } from '@/components/common'
import { RESET_PASSWORD, VERIFY_RESET_PASSWORD_CODE } from '@/graphql'
import { forgotPasswordSchema } from '@/lib'
import { useMutation, useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { notFound, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'
import { ChevronLeft } from 'lucide-react'

import styles from './page.module.scss'

interface IPageProps {
	params: {
		code: string
	}
}

type TypeFormData = z.infer<typeof forgotPasswordSchema>

const Page = ({ params }: IPageProps) => {
	const router = useRouter()
	const { data, loading: isVerifying } = useQuery<{ verified: boolean }>(
		VERIFY_RESET_PASSWORD_CODE,
		{
			variables: {
				code: params.code
			},
			fetchPolicy: 'no-cache'
		}
	)
	const [resetPassword, { loading: isChangingPassword }] = useMutation(
		RESET_PASSWORD,
		{
			onCompleted: () => {
				toast.success('Password changed')
				router.push(Routes.SIGN_IN)
			},
			onError: (error) => {
				toast.error(error.message ?? "Failed to reset password")
			}
		}
	)

	const form = useForm<TypeFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			confirmPassword: '',
			password: ''
		}
	})
	const { control, handleSubmit } = form

	if (isVerifying) {
		return <Loading />
	}

	if (!data?.verified) {
		return notFound()
	}

	const onSubmit = async (values: TypeFormData) => {
		if (values.password !== values.confirmPassword) {
			toast.error('Passwords do not match')
			return
		}
        resetPassword({
            variables: {
              input: {
                code:params.code,
                password: values.password
              }  
            }
        })
	}

	return (
		<div className={styles.wrapper}>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.inner}>
					<h2>Enter New Password</h2>
					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isChangingPassword}
										type={'password'}
										variant={'form'}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isChangingPassword}
										type={'password'}
										variant={'form'}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className={'w-full'}
						disabled={isChangingPassword}
						type={'submit'}
					>
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
