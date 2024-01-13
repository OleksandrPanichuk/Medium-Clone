"use client"
import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const BackButton = ({ callbackUrl }: { callbackUrl: string }) => {
	return (
		<Link
			href={`/${callbackUrl}`}
			className={cn(buttonVariants(),'absolute hidden md:flex md:top-16 md:left-16 lg:top-20 lg:left-20 width-max px-5 py-3 rounded-md  items-center gap-x-1')}
		>
            <ArrowLeft className='w-4 h-4' />
			Back
		</Link>
	)
}
