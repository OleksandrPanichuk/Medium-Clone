'use client'

import { Separator } from '@/components/ui'
import styles from './Tabs.module.scss'
import type { TypeBaseUser } from '@/shared/types'
import { useAuth } from '@/components/providers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'
import { getProfileTabs } from '@/shared/constants'

interface ITabsProps {
	user: TypeBaseUser
}

export const Tabs = ({ user }: ITabsProps) => {
	const { user: currentUser } = useAuth()

	const tabs = getProfileTabs(user.id === currentUser?.id, user.id)
	const pathname = usePathname()

	return (
		<div>
			<ul className={styles.tabs}>
				{tabs.map((tab) => (
					<li
						className={cn(
							styles.tab,
							pathname === tab.href && styles.tab_active
						)}
						key={tab.id}
					>
						<Link href={tab.href}>{tab.title}</Link>
					</li>
				))}
			</ul>
			<Separator className={styles.separator} />
		</div>
	)
}
