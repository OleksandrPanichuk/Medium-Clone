import { UnauthorizedLayout } from '@/components/layout'
import { PropsWithChildren } from 'react'

const Layout =  ({children}:PropsWithChildren) => {
	return <UnauthorizedLayout >{children}</UnauthorizedLayout>
}

export default Layout
