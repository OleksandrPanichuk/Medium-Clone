'use client'
import { Container, Separator } from '@/components/ui'
import { settingsSidebarLinks } from '@/shared/constants'
import { useEffect, useState } from 'react'

import styles from './page.module.scss'
import { cn } from '@/lib'
import { Header } from '@/components/common'
import {
	EditProfileForm,
	SubscriptionSection,
	VerifyProfile
} from '@/components/screens/settings'

const Page = () => {
	const [activeSection, setActiveSection] = useState('profile')

	const handleLinkClick = (sectionId: string) => {
		setActiveSection(sectionId)
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		const options = {
			rootMargin: '0px',
			threshold: 1
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id)
					break
				}
			}
		}, options)

		const sections = document.querySelectorAll<HTMLElement>(
			`.${styles.section}`
		)
		sections.forEach((section) => observer.observe(section))

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<>
			<Header />
			<Container as="main" className={styles.wrapper}>
				<div className={styles.sidebar}>
					{settingsSidebarLinks.map((section) => {
						const Icon = section.icon
						return (
							<button
								key={section.id}
								className={cn(
									styles.sidebar__item,
									activeSection === section.id &&
										styles['sidebar__item--active']
								)}
								onClick={() => handleLinkClick(section.id)}
							>
								<Icon />
								<span>{section.title}</span>
							</button>
						)
					})}
				</div>
				<div className={styles.sections}>
					<section className={styles.section} id={'profile'}>
						<h2 className={'text-zinc-800 font-semibold font-secondary'}>
							Profile
						</h2>
						<Separator />
						<EditProfileForm />
					</section>
					<section
						className={cn(styles.section, styles.section__verify)}
						id={'verify'}
					>
						<h2 className={'text-zinc-800 font-semibold font-secondary'}>
							Verify Email
						</h2>
						<VerifyProfile />
					</section>
					<section
						className={cn(styles.section, styles.section__subscription)}
						id={'subscription'}
					>
						<h2 className={'text-zinc-800 font-semibold font-secondary'}>
							Subscription Management
						</h2>
						<SubscriptionSection />
					</section>
				</div>
			</Container>
		</>
	)
}

export default Page
