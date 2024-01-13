import { DocumentNode, FetchPolicy } from "@apollo/client"
import { z } from "zod"
import { variablesSchema } from "./schema"


type TypeVariables = z.infer<typeof variablesSchema>

export type InputType =  {
	query:DocumentNode
    variables?: TypeVariables
}

export type ReturnType<TData> = TData[] | undefined