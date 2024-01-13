"use client"
import { Button, Header as HeaderPrimary } from '@/components/ui'
import Link from 'next/link'

import { MobileNavbar, Navbar } from '@/components/screens/home'
import { Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'
import { useHomePageStore } from '@/store'
import { cn } from '@/lib'
import { UserButton } from '@/components/common'

const Header =  () => {
	const {user} = useAuth()
	const {isHeroInView} = useHomePageStore()

	return (
		<HeaderPrimary className={cn('fixed top-0 left-0 z-20 bg-yellow border-zinc-600 transition-colors', !isHeroInView && 'bg-white')}>
			<Navbar  />
			<MobileNavbar />
		{user ? <UserButton /> : <Button className="rounded-2xl">
				<Link href={Routes.SIGN_UP}>
					Get Started
				</Link>
			</Button>}
		</HeaderPrimary>
	)
}

export default Header