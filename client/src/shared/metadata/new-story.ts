import { Metadata } from "next";
import { APP_URL } from "@/shared/config";
import { Routes } from "@/shared/constants";
import { baseMetadata } from "@/shared/metadata";
import { absolutePath } from "@/lib";



export const constructMetadata = ({title = 'Create story', description='Here you can create your own story on any topic'}:{title?:string, description?:string} = {}): Metadata => {
    
    const pageUrl = absolutePath(`${Routes.NEW_STORY}`)
    
    return {
        title,
        description,
        metadataBase:new URL(pageUrl),
        icons: baseMetadata.icons,
        applicationName:baseMetadata.applicationName,
        openGraph: {
            title, 
            type: 'website',
            description,
            url:pageUrl,
            siteName: baseMetadata.applicationName,
        },
        twitter: {
            title,
            description,
            card:'summary',
        }
    }
}