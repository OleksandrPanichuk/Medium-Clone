"use server"
import { cookies } from 'next/headers'
import { CURRENT_USER_QUERY } from '@/graphql'
import { apolloClient } from '@/lib'
import  type { TypeCurrentUser } from '@/shared/types'
import { SESSION_COOKIE_NAME } from '@/shared/config'


export async function currentUser() {
	try {
		const _cookies = cookies()
		const session = _cookies.get(SESSION_COOKIE_NAME)
		if(!session) return null

		const { data } = await apolloClient.query<{ user: TypeCurrentUser }>({
			query: CURRENT_USER_QUERY,
			canonizeResults:true,
			context: {
				headers: { Cookie: cookies().toString() },
			},
			fetchPolicy:'no-cache',
		})
		return data.user
	} catch (err) {
		return null
	}
}

