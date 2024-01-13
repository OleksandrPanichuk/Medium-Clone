"use server"
import { apolloClient } from "@/lib"
import { variablesSchema } from "./schema"
import { InputType, ReturnType } from "./types"
import { INITIAL_POSTS_LIMIT } from "@/shared/config"
import { cookies } from "next/headers"



export async function getPosts<TData>({variables = {}, query}:InputType ): Promise<ReturnType<TData>> {
	try {
        const {creatorId, tag, take, sortBy } = variablesSchema.parse(variables)

		const {data} =  await apolloClient.query<{posts: TData[]}>({
			query,
			variables: {
				query: {
					take:take ?? INITIAL_POSTS_LIMIT,
                    tag,
                    creatorId,
					sortBy
				},
			},
			context: {
				cache:'no-store',
				next: {
					revalidate: 0
				},
				headers: {
                    Cookie: cookies().toString()
                },
			},
			fetchPolicy:'no-cache'
		})
		
		
		return data.posts 
	} catch(err) {
		console.log(err)
		return 
	}
}