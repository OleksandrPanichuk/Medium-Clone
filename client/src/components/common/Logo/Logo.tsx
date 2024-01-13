import { cn } from '@/lib'
import Image from 'next/image'
import Link from 'next/link'

import styles from './Logo.module.scss'
import { Images, Routes } from '@/shared/constants'

interface ILogoProps {
	className?: string
	width?: number
	height?: number
}

export const Logo = ({ height, width, className }: ILogoProps) => {
	return (
		<Link href={Routes.ROOT} className={cn(styles.logo, className)}>
			<Image
				src={Images.LOGO}
				alt="logo"
				width={width ?? 48}
				height={height ?? 48}
			/>
			<span className={styles.text}>Podium</span>
		</Link>
	)
}
