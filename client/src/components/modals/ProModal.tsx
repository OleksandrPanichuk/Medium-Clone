'use client'

import { useModalStore } from '@/store'
import { Button, Dialog, DialogContent } from '../ui'
import Image from 'next/image'
import { Images, Modals, proModalFeatures } from '@/shared/constants'
import { useSubscription } from '@/services'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/components/providers'

export const ProModal = () => {
	const { isOpen, onClose, type } = useModalStore()
	const [subscribeOrManage, {loading}] = useSubscription()
	const {user} = useAuth()

	const onClick = () => subscribeOrManage()

	if (type !== Modals.PRO || !user || user?.subscribed) return null

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-sm">
				<div className="aspect-video relative flex items-center justify-center">
					<Image
						src={Images.PRO_MODAL}
						alt="Hero"
						className="object-cover"
						fill
					/>
				</div>
				<div className="text-neutral-700 mx-auto space-y-3 p-6">
					<h2 className="font-semibold text-xl">
						Upgrade to Podium Pro Today!
					</h2>
					<p className="text-xs font-semibold text-neutral-600">
						Explore the best of Podium
					</p>
					<div className="pl-3">
						<ul className="text-sm list-disc">
							{proModalFeatures.map((feature, index) => (
								<li key={index}>{feature}</li>
							))}
						</ul>
					</div>
					<Button
						variant={'sky'}
						onClick={onClick}
						className="w-full flex items-center gap-x-1"
					>
						{loading && <Loader2 className={'animate-spin'} />}
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
