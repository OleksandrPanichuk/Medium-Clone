import { SEARCH_QUERY } from "@/graphql"
import { SEARCH_TAKE_LIMIT } from "@/shared/config"
import { TypeSearchResponse } from "@/shared/types"
import { useQuery } from "@apollo/client"

export const useSearchQuery = (searchValue:string) => {
    return useQuery<TypeSearchResponse>(SEARCH_QUERY, {
		variables: {
			searchValue: searchValue,
			take: SEARCH_TAKE_LIMIT
		},
		skip: !searchValue
	})
}