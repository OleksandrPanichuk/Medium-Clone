import { z } from "zod";
import { variablesSchema } from "./schema";
import {  TypeListExtended, TypeListPost } from "@/shared/types";


export type InputType = z.infer<typeof variablesSchema>

export type ReturnType = {
    posts: TypeListPost[]
    list:TypeListExtended
} | undefined