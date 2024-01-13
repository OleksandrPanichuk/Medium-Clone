'use client'
import { Logo } from '@/components/common'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui'
import { LogIn, Menu } from 'lucide-react'
import Link from 'next/link'

import styles from './MobileNavbar.module.scss'

import { homeNavbarRoutes as routes, Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'


export const MobileNavbar = () => {
	
	const {user} = useAuth()
	

	return (
		<nav className={styles.wrapper}>
			<Sheet>
				<SheetTrigger>
					<Menu className="w-6 h-6" />
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-y-8 border border-zinc-100 bg-zinc-50 shadow-lg">
					<Logo />
					<ul className={styles.routes}>
						{routes.map((route) => (
							<li className={styles.route} key={route.href}>
								<route.icon className={styles.icon} />
								<Link href={route.href}>{route.name}</Link>
							</li>
						))}
						{!user && (
							<li className={styles.route}>
								<LogIn className={styles.icon} />
								<Link href={Routes.SIGN_IN}>Sign In</Link>
							</li>
						)}
					</ul>
				</SheetContent>
			</Sheet>
		</nav>
	)
}
