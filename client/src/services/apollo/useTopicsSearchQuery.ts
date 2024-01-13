import { TAGS_QUERY } from "@/graphql"
import { TAGS_TAKE_LIMIT } from "@/shared/config"
import { TypeTagExtended } from "@/shared/types"
import { useQuery } from "@apollo/client"


export const useTopicsSearchQuery = (debouncedSearchValue:string, searchValue:string) => {
    return useQuery<{tags:TypeTagExtended[]}>(TAGS_QUERY, {
		variables: {
			query: {
				take: TAGS_TAKE_LIMIT,
				sortBy: 'name',
				searchValue:debouncedSearchValue
			}
		},
		skip:!searchValue,
	})
}   