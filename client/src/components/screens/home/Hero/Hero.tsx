"use client"
import { Container } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

import styles from './Hero.module.scss'
import { Routes } from '@/shared/constants'
import { useAuth } from '@/components/providers'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useHomePageStore } from '@/store'

const randomImage =
	'https://source.unsplash.com/random/900×900?programming,work,exploring'

export const Hero = () => {
	const {user} = useAuth()
	const {ref, inView}= useInView({threshold:.1,initialInView:true })

	const {setIsHeroInView} = useHomePageStore()

	useEffect(() => {
		setIsHeroInView(inView)
	},[inView, setIsHeroInView])

	return (
		<section ref={ref} className={styles.hero}>
			<Container className={styles.container}>
				<div className={styles.content}>
					<h1 className={styles.title}>Stay curious</h1>
					<p className={styles.text}>
						Discover stories, thinking, and expertise from writers on any topic.
					</p>
					<Link
						className={styles.link}
						href={user ? Routes.EXPLORE_TOPICS : Routes.SIGN_IN}
					>
						Start reading
					</Link>
				</div>
				<div className={styles.image}>
					<Image alt="random image" src={randomImage} fill />
				</div>
			</Container>
		</section>
	)
}
