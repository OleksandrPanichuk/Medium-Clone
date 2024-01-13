import { Header } from '@/components/common'
import { PropsWithChildren } from 'react'

export const UnauthorizedLayout = async ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
