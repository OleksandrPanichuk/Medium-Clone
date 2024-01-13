import { Metadata } from "next";
import { TypeBaseUser } from "@/shared/types";
import { baseMetadata } from "@/shared/metadata";


export const constructMetadata = ({user, title , description,pageUrl}:{user:TypeBaseUser, title?:string, description?:string, pageUrl:string}):Metadata => {
    
    return {
        title,
        description,
        applicationName: baseMetadata.applicationName,
        metadataBase:new URL(pageUrl),
        icons: baseMetadata.icons,
        openGraph: {
            type:'profile',
            description,
            title,
            url:pageUrl,
            username:user.username,
            images: !!user.avatar ? [
                {
                    url:user.avatar.url,
                    alt:"User avatar",
                    username:user.username,
                }
            ] : undefined,
            siteName: baseMetadata.applicationName,
        },
        twitter: {
            title,
            description,
            card:'summary',
            images: !!user.avatar ?  [
                {
                    url:user.avatar.url,
                    alt:"User avatar",
                    username:user.username
                }
            ]:undefined
        }
    }   
}