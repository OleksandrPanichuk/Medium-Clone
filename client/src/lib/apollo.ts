import { APP_URL } from '@/shared/config'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'


export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	ssrMode:typeof window === "undefined",
	connectToDevTools: true,
	link:createUploadLink({
		uri: `${APP_URL}/api/graphql`,
		headers: {
			'apollo-require-preflight': 'true',	
		},
		credentials: 'include',
	})
})


