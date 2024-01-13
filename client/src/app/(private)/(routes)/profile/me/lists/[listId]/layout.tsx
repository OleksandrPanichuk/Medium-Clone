import { Header } from '@/components/common'
import { ListLayout } from '@/components/layout'
import { currentUser } from '@/services'
import { TypeCurrentUser } from '@/shared/types'
import { PropsWithChildren } from 'react'

const Layout = async ({ children }: PropsWithChildren) => {
	const user = (await currentUser()) as TypeCurrentUser
	return (
		<>
			<Header />
			<ListLayout user={user}>{children}</ListLayout>
		</>
	)
}

export default Layout
