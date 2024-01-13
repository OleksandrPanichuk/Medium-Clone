import { AuthorizedLayout } from '@/components/layout'
import { PropsWithChildren } from 'react'

const Layout = ({children}:PropsWithChildren) => {
	return <AuthorizedLayout >{children}</AuthorizedLayout>
}

export default Layout
