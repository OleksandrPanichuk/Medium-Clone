'use client'
import { PropsWithChildren } from 'react'
import { Container } from '@/components/ui'
import styles from './Scroll.module.scss'
import { cn } from '@/lib'

interface IScrollProps {
	classNames?:{
		className?:string
		containerClassName?:string
	}
}

export const Scroll = ({
	children,
	classNames
}: PropsWithChildren<IScrollProps>) => {
	return (
		<Container className={cn(styles.container, classNames?.containerClassName)}>
			<div
				className={cn(styles.wrapper, 'scrollbar', classNames?.className)}
			>
				{children}
			</div>
		</Container>
	)
}
