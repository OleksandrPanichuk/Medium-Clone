import { Header } from '@/components/common'
import { Container } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { Images, Routes } from '@/shared/constants'
import { Metadata } from 'next'
import { constructNotFoundMetadata } from '@/shared/metadata/not-found'

export const metadata: Metadata = constructNotFoundMetadata()

export default function NotFound() {
	return (
		<>
			<Header />
			<Container
				fullScreen={false}
				className="flex flex-col items-center gap-y-2 "
			>
				<div className="relative w-full h-96 ">
					<Image
						src={Images.NOT_FOUND}
						alt="not found"
						fill
						objectFit="contain"
					/>
				</div>
				<Link href={Routes.ROOT} className="underline text-zinc-700 text-xl">
					Home
				</Link>
			</Container>
		</>
	)
}
