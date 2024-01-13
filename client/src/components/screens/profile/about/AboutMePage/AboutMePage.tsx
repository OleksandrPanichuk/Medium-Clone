'use client'

import { useAuth } from '@/components/providers'
import styles from './AboutMePage.module.scss'
import { Button } from '@/components/ui'
import { useProfileStore } from '@/store'
import { AboutForm } from '@/components/screens/profile/about'



const AboutMePage = () => {
	const { user } = useAuth()
	const { isEditing, enableEditing } = useProfileStore()

	if (isEditing) {
		return <AboutForm />
	}

	if (!user?.about?.trim().length) {
		return (
			<section className={styles['no-content']}>
				<h3 className={styles['no-content__title']}>
					Tell the world about yourself
				</h3>
				<p className={styles['no-content__text']}>
					Here&apos;s where you can share more about yourself: your history,
					work experience, accomplishments, interests, dreams, and more.
				</p>
				<Button
					variant={'outline'}
					className={styles['no-content__button']}
					onClick={enableEditing}
				>
					Get started
				</Button>
			</section>
		)
	}

	return (
		<div className={styles.content}>
			<pre className={styles.about}>{user.about}</pre>
			<div className={styles.content__actions}>
				<Button variant={'outline'} onClick={enableEditing}>
					Edit
				</Button>
			</div>
		</div>
	)
}

export default AboutMePage