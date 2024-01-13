import { absolutePath } from "@/lib"
import { Metadata } from "next"
import { Routes } from "@/shared/constants"
import { baseMetadata } from "@/shared/metadata";



export const constructMetadata = ({title = 'Settings', description = "Craft your online persona & unlock pro features. Edit profile, verify for SEO, and upgrade your website experience in the settings."}:{title?:string, description?:string} = {}): Metadata => {
    const pageUrl = absolutePath(Routes.SETTINGS);
    return {
        title,
        description,
        metadataBase: new URL(pageUrl),
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