import { Metadata } from "next";
import { APP_URL } from "@/shared/config";
import { Images } from "@/shared/constants";


export const baseMetadata = {
    title:'Podium',
    applicationName: 'Podium',
    icons: Images.FAVICON,
    description: 'Podium is an open source project where everyone can share programming posts on various topics'
}

export const constructMetadata = ({title, applicationName, description}: {
    title?:string,
    description?:string,
    applicationName?:string
} = {}) : Metadata =>  {
    return {
        title: {
            default:baseMetadata.title,
            template:`%s | ${baseMetadata.title}`,
        },
        description:description ?? baseMetadata.description,
        icons: baseMetadata.icons,
        twitter: {
            title: {
                default:baseMetadata.title,
                template:`%s | ${baseMetadata.title}`,
            },
            description,
        },
        openGraph: {
            title: {
                default:baseMetadata.title,
                template:`%s | ${baseMetadata.title}`,
            },
            siteName: applicationName,
            description,
            url: APP_URL,
            type:'website',
        },
        applicationName: applicationName ?? baseMetadata.applicationName,
        metadataBase: new URL(APP_URL),
    }
};
