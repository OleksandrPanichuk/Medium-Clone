import type { TypeBasePost } from "@/shared/types"
import { Metadata } from "next"
import { APP_URL } from "@/shared/config"
import {  Routes } from "@/shared/constants"
import { constructNotFoundMetadata } from "@/shared/metadata/not-found"
import { baseMetadata } from "@/shared/metadata"
import { absolutePath, toDateString } from "@/lib"


export const constructMetadata = ({post}:{post:TypeBasePost | null}):Metadata => {
    if(!post)  {
        return constructNotFoundMetadata()
    }
    const title = post.title.slice(0, 20) + (post.title.slice(20).length ? "..." : '')
    const description = post.description 

    const pageUrl = absolutePath(`${Routes.POSTS}/${post.id}`)
    
    return {
        title,
        description,
        metadataBase:new URL(pageUrl),
        applicationName:baseMetadata.applicationName,
        icons:baseMetadata.icons,
        openGraph: {
            title,
            description,
            type:'article',
            url:pageUrl,
            siteName: baseMetadata.applicationName,
            publishedTime:toDateString(post.createdAt),
            images: [
                {
                    url:post.image.url,
                    width: 400,
                    height:400,
                }
            ],
            authors: post.creator.username
        },
        twitter: {
            card:'summary_large_image',
            description,
            title,
            images: [
                {
                    url:post.image.url,
                    width:400,
                    height:400
                }
            ]
        }
    }
}