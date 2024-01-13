'use client'

import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui'
import { absolutePath } from '@/lib'
import { useSubscription } from '@/services'
import { Routes } from '@/shared/constants'
import { Loader2 } from 'lucide-react'

export const SubscriptionSection = () => {
	const [subscribeOrManage, { loading }] = useSubscription()
	const { user } = useAuth()
	const onClick = () => subscribeOrManage(absolutePath(Routes.SETTINGS))
	return (
		<div className={'flex flex-col gap-y-2 items-start'}>
			<p className='text-zinc-600 text-sm -mt-1'>{user?.subscribed ? 'You are currently on pro plan'  : 'You are currently on free plan '}</p>
			<Button
				variant={'sky'}
				onClick={onClick}
				className=" flex items-center gap-x-1"
			>
				{loading && <Loader2 className={'animate-spin'} />}
				{user?.subscribed ? 'Manage' : 'Upgrade'}
			</Button>
		</div>
	)
}
