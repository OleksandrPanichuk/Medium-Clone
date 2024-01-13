import { cn } from '@/lib'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/Skeleton'
import { User } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface IAvatarProps {
	src?: React.ImgHTMLAttributes<HTMLImageElement>['src']
	name?: string
	className?: string
	innerClassName?: string
	isLoading?: boolean
}

export const Avatar = ({
	src,
	name,
	className,
	innerClassName,
	isLoading,
	...props
}: HTMLAttributes<HTMLDivElement> & IAvatarProps) => {
	if (isLoading) return <Skeleton className={cn('w-10 h-10 rounded-full ', className)} />
	return (
		<div
			{...props}
			className={cn(
				'relative rounded-full w-10 bg-white h-10 border border-zinc-100 flex items-center justify-center',
				className,
				src && 'border-none'
			)}
		>
			{src && (
				<Image
					className={cn('rounded-full', innerClassName)}
					fill
					src={src}
					alt={`${name} avatar` ?? 'avatar'}
				/>
			)}
			{name && !src && (
				<span
					className={cn(
						'w-full h-full flex items-center justify-center',
						innerClassName
					)}
				>
					{name.trim()[0]}
				</span>
			)}
			{!src && !name && <User className={cn('w-[80%] h-[80%] ', innerClassName)} />}
		</div>
	)
}
