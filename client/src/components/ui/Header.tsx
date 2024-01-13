'use client'
import { Container } from '@/components/ui'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib'

interface IHeaderProps {
	className?: string
	containerClassName?: string
}

export const Header = ({
	children,
	className,
	containerClassName
}: PropsWithChildren<IHeaderProps>) => {
	return (
		<header className={cn('w-full border-b border-border h-[75px]', className)}>
			<Container
				className={cn('flex items-center gap-x-4', containerClassName)}
				fullScreen
			>
				{children}
			</Container>
		</header>
	)
}
