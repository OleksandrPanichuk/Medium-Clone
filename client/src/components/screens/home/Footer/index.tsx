import { Logo } from '@/components/common'
import { Container } from '@/components/ui'
import { homeSidebarLinks } from '@/shared/constants'
import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.wrapper}>
			<Container className={styles.container}>
				<Logo className={styles.logo} />
                <div className={styles.links}>
                {homeSidebarLinks.map(link => (
                        <Link key={link.id} href={link.href} className={styles.link}>{link.text}</Link>
                    ))}
                </div>
			</Container>
		</footer>
	)
}
