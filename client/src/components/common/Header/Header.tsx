'use client'
import { Button, Header as HeaderPrimary } from '@/components/ui'
import Image from 'next/image'
import React from 'react'
import { SearchBar, UserButton } from '@/components/common'
import Link from 'next/link'
import { PenBox, Search } from 'lucide-react'
import styles from './Header.module.scss'
import { useAuth } from '@/components/providers'
import {Images, Routes} from "@/shared/constants";

const Header = () => {
	const { user } = useAuth()
	return (
		<HeaderPrimary>
			<Link href="/">
				<Image width={48} height={48} alt="logo" src={Images.LOGO} />
			</Link>
			<SearchBar className={styles.search__bar} />
			<div className={styles.search}>
				<Link href={Routes.SEARCH} className={styles.icon}>
					<Search />
				</Link>
			</div>
			{!!user && (
				<>
					<Link href={Routes.NEW_STORY} className={styles.write}>
						<PenBox className={styles.icon} />
						Write
					</Link>
					<UserButton />
				</>
			)}
			{!user && (
				<Button className="rounded-2xl">
					<Link href={Routes.SIGN_IN}>Get Started</Link>
				</Button>
			)}
		</HeaderPrimary>
	)
}

export default Header
