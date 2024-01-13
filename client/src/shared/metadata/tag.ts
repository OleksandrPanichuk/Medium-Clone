import { Metadata } from "next";
import { Routes } from "@/shared/constants";
import { baseMetadata } from "@/shared/metadata";
import { absolutePath } from "@/lib";


export const constructMetadata = ({tag}:{tag:string}):Metadata => {
    const description =  `This page lists posts with tag ${tag}`
    const title = tag
    const pageUrl = absolutePath(`${Routes.TAG}/${tag}`)

    return {
        title,
        openGraph: {
            title,
            description,
            url:pageUrl,
            type:'website',
            siteName: baseMetadata.applicationName,
        },
        twitter: {
            title,
            description,
            card:'summary',
        } ,
        applicationName:baseMetadata.applicationName,
        icons:baseMetadata.icons,
        metadataBase:new URL(pageUrl),
        description
    }
}