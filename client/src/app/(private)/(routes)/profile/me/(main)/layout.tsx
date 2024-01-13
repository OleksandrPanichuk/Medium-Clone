import { Header } from '@/components/common'
import { ProfileLayout } from '@/components/layout'
import { currentUser } from '@/services'
import type { TypeCurrentUser } from '@/shared/types'
import { PropsWithChildren } from 'react'

const Layout = async ({ children }: PropsWithChildren) => {
	const user = (await currentUser()) as TypeCurrentUser
	return (
		<>
			<Header />
			<ProfileLayout user={user}>{children}</ProfileLayout>
		</>
	)
}

export default Layout
