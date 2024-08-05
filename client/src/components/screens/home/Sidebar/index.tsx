import { Topics } from '@/components/screens/home'
import { Separator } from '@/components/ui'
import { homeSidebarLinks } from '@/shared/constants'
import Link from 'next/link'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
	return (
		<aside className={styles.wrapper}>
			<div className={styles.content}>
				<Topics />
				<Separator />
                <div className={styles.links}>
                    {homeSidebarLinks.map(link => (
                        <Link key={link.id} href={link.href} className={styles.link}>{link.text}</Link>
                    ))}
                </div>
			</div>
		</aside>
	)
}
