import { AuthLayout } from '@/components/layout'
import { PropsWithChildren } from 'react'

const Layout = ({children}:PropsWithChildren) => {
	return <AuthLayout>{children}</AuthLayout>
}

export default Layout
