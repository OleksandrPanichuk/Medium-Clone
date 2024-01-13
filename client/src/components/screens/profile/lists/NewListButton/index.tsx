'use client'

import { Modals } from '@/shared/constants'
import { useModalStore } from '@/store'
import { PlusCircle } from 'lucide-react'
import styles from './NewListButton.module.scss'
import { TypeCreateListResponse } from '@/shared/types'
import { useListsContext } from '@/components/screens/profile/lists'
import { useAuth } from '@/components/providers'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'

export const NewListButton = () => {
	const { onOpen } = useModalStore()
	const { user } = useAuth()
	const { setLists, lists } = useListsContext()

	if(!user?.subscribed && lists.length >= SUBSCRIPTION_LIMITS.LISTS) return null
	
	return (
		<button
			onClick={() =>
				onOpen(Modals.CREATE_LIST, {
					onSubmit(data: TypeCreateListResponse) {
						setLists((prev) => [...prev, data])
					}
				})
			}
			className={styles['new-list']}
		>
			<PlusCircle />
			Create List
		</button>
	)
}
