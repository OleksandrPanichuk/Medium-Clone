'use client'
import { MouseEvent, useEffect, useState } from 'react'
import { ClapFilledIcon, ClapIcon } from '@/components/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'

import styles from './PostClaps.module.scss'
import { useMutation } from '@apollo/client'
import { TOGGLE_POST_CLAPS } from '@/graphql'
import type { TypeBasePost, TypeUpdatePostClapsResponse } from '@/shared/types'
import { useAuth } from '@/components/providers'
import { toast } from 'sonner'

interface IPostClapsProps {
	initialClaps?: { userId: string }[] | null
	post: TypeBasePost
}

export const PostClaps = ({ initialClaps, post }: IPostClapsProps) => {
	const { user } = useAuth()
	
		

	const [isUserHasClap, setIsUserHasClap] = useState<boolean>(
		initialClaps?.some((clap) => clap.userId === user?.id) ?? false
	)
	const [clapsCount, setClapsCount] = useState<number | null>(
		initialClaps ? initialClaps.length : null
	)

	

	const [updateClaps, { loading: isTogglingClaps }] =
		useMutation<TypeUpdatePostClapsResponse>(TOGGLE_POST_CLAPS, {
			onCompleted: (response) => {
				setClapsCount(response.clap._count.claps)
				setIsUserHasClap((prev) => !prev)
			},
			fetchPolicy: 'no-cache',
			variables: {
				input: {
					postId: post.id,
					userId: user?.id
				}
			}
		})

	const onClick = (event: MouseEvent<HTMLButtonElement>) => {
		if(!user) {
			toast.error('Please sign in first')
			return
		}
		if(!user?.verified) {
			toast.error('Please verify your email first')
			return
		}
		if (user && clapsCount !== null && user?.verified) {
			;(event.target as HTMLElement)
				.closest(`.${styles.button}`)
				?.classList.add(styles.button_active)
			updateClaps()
			setTimeout(() => {
				;(event.target as HTMLElement)
					.closest(`.${styles.button}`)
					?.classList.remove(styles.button_active)
			}, 500)
		}

	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						disabled={isTogglingClaps}
						className={styles.button}
						onClick={onClick}
					>
						{isUserHasClap ? (
							<ClapFilledIcon
								className={styles.icon}
								width="1.5rem"
								height="1.5rem"
							/>
						) : (
							<ClapIcon
								className={styles.icon}
								width={'1.5rem'}
								height="1.5rem"
							/>
						)}
						<span className={styles.count}>
							{clapsCount === null ? <>--</> : clapsCount}
						</span>
					</button>
				</TooltipTrigger>
				<TooltipContent>Claps</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
