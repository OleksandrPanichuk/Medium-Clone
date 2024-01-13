import { Metadata } from "next"
import{APP_URL} from '@/shared/config'
import {Routes, Images} from '@/shared/constants'
import { baseMetadata } from "@/shared/metadata"
import { absolutePath } from "@/lib"

export const constructNotFoundMetadata = ({title = 'Not Found', description= 'This page was not found'}:{title?:string, description?:string} = {}):Metadata => {
        
  const pageUrl= absolutePath(Routes.NOT_FOUND)
  return {
            title,
            robots:'noindex',
            description,
            applicationName:baseMetadata.applicationName,
            icons:baseMetadata.icons,
            openGraph: {
                title,
                description,
                type: 'website',
                url: pageUrl, 
                siteName: baseMetadata.applicationName,
                images: [
                    {
                        url: absolutePath(`/${Images.NOT_FOUND}`),
                        width: 400,
                        height: 400,
                        type:'image/jpg',
                        alt:'Not found'
                      },
                ]
              },
              twitter: {
                card: 'summary_large_image',
                description,
                title,
                images: [
                    {
                        url: absolutePath(`/${Images.NOT_FOUND}`),
                      width: 400,
                      height: 400,
                      type:'image/jpg'
                    },
                ]
              },
        }
}