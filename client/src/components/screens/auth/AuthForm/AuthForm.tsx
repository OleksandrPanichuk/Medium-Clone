'use client'

import { useAuth } from '@/components/providers/AuthProvider'
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
import { SIGN_IN, SIGN_UP } from '@/graphql'
import { TypeCurrentUser } from '@/shared/types'
import { ApolloError, useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import styles from './AuthForm.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signInSchema, signUpSchema } from '@/lib'
import { Images, Routes } from '@/shared/constants'

export const AuthForm = ({ variant }: { variant: 'LOGIN' | 'REGISTER' }) => {
	const form = useForm({
		resolver:
			variant === 'LOGIN'
				? zodResolver(signInSchema)
				: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		},
		mode: 'onBlur'
	})
	const { handleSubmit, control } = form

	const { setUser } = useAuth()
	const router = useRouter()

	const [authorize, { loading: isLoading }] = useMutation<{
		user: TypeCurrentUser | Omit<TypeCurrentUser, 'subscribed'>
	}>(variant === 'LOGIN' ? SIGN_IN : SIGN_UP)

	const onSubmit = async (values: FieldValues) => {
		try {
			const { data } = await authorize({
				variables: values
			})
			form.reset()

			if (data)
				setUser({
					...data.user,
					subscribed: 'subscribed' in data.user ? data.user.subscribed : false
				})

			router.push('/')
		} catch (err: any) {
			if (err instanceof ApolloError) {
				return toast.error(err.message)
			}

			return toast.error('Failed to authorize a user')
		}
	}

	const continueWithGoogle = () => {
		window.location.href = process.env.NEXT_PUBLIC_GOOGLE_SIGN_IN_URL
	}
	const continueWithGitHub = () => {
		window.location.href = process.env.NEXT_PUBLIC_GITHUB_SIGN_IN_URL
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<Form {...form}>
					<form className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
						{variant === 'REGISTER' && (
							<FormField
								control={control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} disabled={isLoading} variant={'form'} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											variant={'form'}
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											variant={'form'}
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									{variant === 'LOGIN' ? (
										<div className={styles.password}>
											<FormMessage />
											<div />
											<Link
												href={Routes.FORGOT_PASSWORD}
												className={styles.password__forget}
											>
												Forgot password?
											</Link>
										</div>
									) : (
										<FormMessage />
									)}
								</FormItem>
							)}
						/>
						<Button className="w-full" type="submit" disabled={isLoading}>
							{variant === 'LOGIN' ? 'Sign in' : 'Register'}
						</Button>
					</form>
				</Form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						<button
							onClick={continueWithGoogle}
							className={styles.socialButton}
						>
							<Image
								src={Images.GOOGLE_LOGO}
								alt="Google"
								width={24}
								height={24}
							/>
						</button>
						<button
							onClick={continueWithGitHub}
							className={styles.socialButton}
						>
							<Image
								src={Images.GITHUB_LOGO}
								alt="GitHub"
								width={24}
								height={24}
							/>
						</button>
					</div>
				</div>
				<div className={styles.bottom}>
					<div>
						{variant === 'LOGIN'
							? 'New to Podium?'
							: 'Already have an account?'}
					</div>
					<Link
						href={variant === 'LOGIN' ? Routes.SIGN_UP : Routes.SIGN_IN}
						className="underline cursor-pointer"
					>
						{variant === 'LOGIN' ? 'Create an account' : 'Sign In'}
					</Link>
				</div>
			</div>
		</div>
	)
}
