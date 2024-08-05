import { Logo } from '@/components/common'
import styles from './Navbar.module.scss'

import Link from 'next/link'
import { TypeUser } from '@/shared/types'
import { homeNavbarRoutes as routes, Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'



export const Navbar = () => {
	const {user} = useAuth()
	return (
		<nav className={styles.wrapper}>
			<Logo />
			<ul className={styles.routes}>
				{routes.map((route) => (
					<li key={route.href}>
						<Link href={route.href}>{route.name}</Link>
					</li>
				))}
				{!user && (
					<li>
						<Link href={Routes.SIGN_IN}>Sign In</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
