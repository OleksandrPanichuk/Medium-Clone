import { Metadata } from "next";
import { TypeListExtended } from "@/shared/types";
import { baseMetadata } from "@/shared/metadata";
import { toDateString } from "@/lib";




export const constructMetadata = ({list, title, description, pageUrl}:{list:TypeListExtended ,title?:string, description?:string, pageUrl:string}) : Metadata => {
    return {
        title,
        description,
        applicationName: baseMetadata.applicationName,
        metadataBase: new URL(pageUrl),
        icons: baseMetadata.icons,
        openGraph: {
            type:'article',
            title,
            description,
            url:pageUrl,
            siteName:baseMetadata.applicationName,
            publishedTime:toDateString(list.createdAt),
            authors: list.creator.username,
        },
        twitter: {
            title,
            description,
            card:'summary',
        }
    }
}