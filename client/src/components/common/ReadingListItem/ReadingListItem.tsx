'use client'
import { NamedExoticComponent, memo } from 'react'
import { TypeFindManyList } from '@/shared/types'

import { useAuth } from '@/components/providers'

import styles from './ReadingListItem.module.scss'
import { Avatar, Skeleton } from '@/components/ui'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { formatNumber } from '@/lib'
import { useRouter } from 'next/navigation'
import { Routes } from '@/shared/constants'
import { ReadingListActions } from '@/components/common'

interface IReadingListItemProps {
	data: TypeFindManyList
	canChangeIfCreator?:boolean
	onListDescriptionChange?: (newDescription: string, listId: string) => void
	onListStatusChange?: (newStatus: boolean, listId: string) => void
	onListNameChange?: (newName: string, listId: string) => void
	onListDelete?: (listId: string) => void
}

type TypeReadingListItem = NamedExoticComponent<IReadingListItemProps> & {
	Skeleton: () => JSX.Element
}

//@ts-ignore
export const ReadingListItem: TypeReadingListItem = memo(
	({ data, canChangeIfCreator = true, ...props }: IReadingListItemProps) => {
		const { user: currentUser } = useAuth()
		const router = useRouter()

		const creator = currentUser?.id === data.creator.id ? 'me' : data.creator.id
		const onListClick = () =>
			router.push(`${Routes.PROFILE}/${creator}/${Routes.LISTS}/${data.id}`)

		return (
			<div onClick={onListClick} className={styles.wrapper}>
				<div className={styles.info}>
					<Link
						href={`${Routes.PROFILE}/${creator}`}
						onClick={(event) => event.stopPropagation()}
						className={styles.creator}
					>
						<Avatar
							src={data.creator.avatar?.url}
							name={data.creator.username}
						/>
						<span>{data.creator.username}</span>
					</Link>
					<h3 className={styles.name}>{data.name}</h3>
					<p className={styles.description}>{data.description}</p>
					<div className={'w-full flex items-center justify-between'}>
						<div className={styles.count}>
							<p>
								{data._count.posts
									? data._count.posts === 1
										? `${data._count.posts} story`
										: `${formatNumber(data._count.posts)} stories`
									: 'No stories'}
							</p>
							{!data.public && <Lock />}
						</div>

						{canChangeIfCreator && <ReadingListActions {...props} list={data} />}
					</div>
				</div>
			</div>
		)
	}
)
ReadingListItem.displayName = 'ReadingListItem'

ReadingListItem.Skeleton = function ReadingListItemSkeleton() {
	return (
		<div className={styles.skeleton}>
			<div className={styles.skeleton__info}>
				<div className={styles.skeleton__creator}>
					<Avatar isLoading />
					<Skeleton className={styles.skeleton__username} />
				</div>
				<Skeleton className={styles.skeleton__title} />
				<div className={styles.skeleton__bottom}>
					<Skeleton className={styles.skeleton__count} />
					<Skeleton className={styles.skeleton__actions} />
				</div>
			</div>
		</div>
	)
}
