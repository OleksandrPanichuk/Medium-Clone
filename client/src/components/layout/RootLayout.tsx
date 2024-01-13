import { currentUser } from '@/services'
import { PropsWithChildren } from 'react'
import {
	ApolloProvider,
	AuthProvider,
	ModalProvider
} from '@/components/providers'
import { Toaster } from 'sonner'

export const RootLayout = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()
	
	return (
		<ApolloProvider>
			<html lang="en" suppressHydrationWarning={true}>
				<body>
					<AuthProvider user={user}>
						<ModalProvider />
						<Toaster richColors position="bottom-right" />
						{children}
					</AuthProvider>
				</body>
			</html>
		</ApolloProvider>
	)
}
