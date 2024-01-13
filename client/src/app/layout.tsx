import type { Metadata, Viewport } from 'next'

import '@/styles/globals.scss'
import { RootLayout } from '@/components/layout'
import { PropsWithChildren } from 'react'
import { constructMetadata } from '@/shared/metadata'

export const metadata: Metadata = constructMetadata()

export const viewport: Viewport = {
	themeColor:'#000000',
	initialScale:1,
	maximumScale:1,
	minimumScale:1,
	width:'device-width'
}

export default function Layout({ children }: PropsWithChildren) {
	return <RootLayout>{children}</RootLayout>
}
