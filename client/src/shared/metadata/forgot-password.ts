import { absolutePath } from "@/lib"
import { Metadata } from "next"
import { Routes } from "@/shared/constants"
import { baseMetadata } from "@/shared/metadata"

export const constructMetadata = ({title = 'Reset Password', description = 'Send forgot password link to your email', url = absolutePath(Routes.FORGOT_PASSWORD)}:{description?:string ,title?:string, url?:string} = {}):Metadata => {
    return {
        title,
        metadataBase: new URL(url),
        description,
        applicationName: baseMetadata.applicationName,
        openGraph: {
            title,
            type:'website',
            url,
            description,
            siteName: baseMetadata.applicationName
        },
        twitter :{
            title,
            description,
        }
    }
}