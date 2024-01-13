import { currentUser } from '@/services'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Routes } from '@/shared/constants'

export const AuthorizedLayout = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()

	if (!user) return redirect(Routes.SIGN_IN)

	return <>{children}</>
}