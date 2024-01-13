'use client'

import { apolloClient } from '@/lib'
import {ApolloProvider as ApolloPrimaryProvider} from '@apollo/client'
import { PropsWithChildren } from 'react'

export const ApolloProvider = ({ children }: PropsWithChildren) => {
	return (
		<ApolloPrimaryProvider client={apolloClient}>
			{children}
		</ApolloPrimaryProvider>
	)
}
