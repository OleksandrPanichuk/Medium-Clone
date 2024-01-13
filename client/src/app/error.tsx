'use client'

import { Header } from '@/components/common'
import { XCircle } from 'lucide-react'
import React from 'react'

const Error = () => {
	return (
		<>
			<Header />
			<div className="loading-wrapper">
				<div className={'flex  items-center gap-4'}>
					<XCircle className=" w-8 h-8 text-rose-600" />
					<span className="text-2xl text-zinc-800">Something went wrong</span>
				</div>
			</div>
		</>
	)
}

export default Error
