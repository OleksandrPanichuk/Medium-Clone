import { Metadata } from "next";
import { Routes } from "@/shared/constants";
import { baseMetadata } from "@/shared/metadata";
import { absolutePath } from "@/lib";

export const constructMetadata  = ({title = 'Explore Topics', description = 'In this page you can easily search for any tag.'}: {title?:string, description?:string} = {}):Metadata => {
    const pageUrl = absolutePath(`${Routes.EXPLORE_TOPICS}`)
    return {
        title,
        openGraph: {
            title,
            url:pageUrl,
            description,
            type:'website',
            siteName: baseMetadata.applicationName,
            
        },
        icons: baseMetadata.icons,
        twitter: {
            title,
            description,
            card:'summary',
        } ,
        metadataBase: new URL(pageUrl),
        description
    }
}