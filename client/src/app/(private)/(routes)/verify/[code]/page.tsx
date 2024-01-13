'use client'

import { Loading } from '@/components/common'
import { useEmailVerify } from '@/services'
import { CheckCircle, XCircle } from 'lucide-react'

interface IPageProps {
	params: {
		code: string
	}
}

const Page = ({ params }: IPageProps) => {
	const { loading, data, error } = useEmailVerify(params.code)

	if (loading) {
		return <Loading />
	}

	if (data?.user.verified) {
		return (
			<div className="loading-wrapper">
				<div className={'flex  items-center gap-4'}>
					<CheckCircle className="w-8 h-8 text-green-600" />
					<span className="text-2xl text-zinc-800">Verified</span>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="loading-wrapper">
				<div className={'flex  items-center gap-4'}>
					<XCircle className=" w-8 h-8 text-rose-600" />
					<span className="text-2xl text-zinc-800">Failed to verify</span>
				</div>
			</div>
		)
	}

  throw new Error('Something went wrong')
}

export default Page
