import { TAGS_QUERY } from "@/graphql"
import { TypeTag, TypeTagExtended } from "@/shared/types"
import { QueryHookOptions, useQuery } from "@apollo/client"
import { z } from "zod"


const inputSchema = z.object({
    take: z.number().positive().optional(),
    searchValue: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    skip: z.number().positive().optional()
})

type InputType = z.infer<typeof inputSchema>

type OptionsType = {
    skip?:boolean
    onCompleted?:(data: TypeTagExtended[]) => void
}

type ResponseType = {tags:TypeTagExtended[]}

interface IOptions extends QueryHookOptions<ResponseType> {}

export const useTagsQuery = (query?:InputType, options?:IOptions) => {
    return useQuery<ResponseType>(TAGS_QUERY, {
        ...options ,
        variables: {
            query
        },
        fetchPolicy:options?.fetchPolicy ?? "cache-first",
    })
}