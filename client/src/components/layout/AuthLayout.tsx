import { currentUser } from '@/services'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Routes } from '@/shared/constants'

export const AuthLayout = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()

	if (user) redirect(Routes.ROOT)

	return (
		<div
			className={
				'flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'
			}
		>
			{children}
		</div>
	)
}

