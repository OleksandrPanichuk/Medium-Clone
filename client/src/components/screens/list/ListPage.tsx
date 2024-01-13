'use client'
import { PostsList, useListContext } from '@/components/screens/list'
import { Avatar, Separator } from '@/components/ui'
import { formatDate, formatNumber, toDateString } from '@/lib'
import { Dot, Lock } from 'lucide-react'
import { ReadingListActions } from '@/components/common'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { Routes } from '@/shared/constants'

const ListPage = () => {
	const { list, onListDescriptionChange, onListNameChange, onListStatusChange , onListDelete} = useListContext()
	const router = useRouter()
	const { user } = useAuth()

	

	const pathToUserProfile = `${Routes.PROFILE}/${
		user?.id === list.creator.id ? 'me' : list.creator.id
	}`

	return (
		<section className={'max-w-2xl w-full mx-auto p-5 flex flex-col gap-y-4'}>
			<div className={'flex justify-between w-full items-center gap-x-4'}>
				<div className={'flex gap-x-4 items-start'}>
					<Avatar
						onClick={() => router.push(pathToUserProfile)}
						className={'cursor-pointer'}
						src={list.creator.avatar?.url}
						name={list.creator.username}
					/>
					<div>
						<span
							onClick={() => router.push(pathToUserProfile)}
							className={
								'text-base font-medium text-zinc-700 font-secondary cursor-pointer hover:text-zinc-900 transition-colors hover:underline'
							}
						>
							{list.creator.username}
						</span>
						<div
							className={'flex items-center text-zinc-600 text-sm font-medium '}
						>
							<time dateTime={toDateString(list.createdAt)}>
								{formatDate(list.createdAt)}
							</time>
							<Dot />
							<p>
								{list._count.posts
									? list._count.posts === 1
										? `${list._count.posts} story`
										: `${formatNumber(list._count.posts)} stories`
									: 'No stories'}
							</p>
							{!list.public && <Lock className={'w-4 h-4 ml-2'} />}
						</div>
					</div>
				</div>
				<ReadingListActions
					list={list}
					onListStatusChange={onListStatusChange}
					onListDescriptionChange={onListDescriptionChange}
					onListNameChange={onListNameChange}
					onListDelete={onListDelete}
				/>
			</div>
			<div className={'flex gap-y-2 flex-col'}>
				<h1 className={'text-3xl text-zinc-900 font-bold'}>{list.name}</h1>
				{list.description && (
					<pre className={'text-zinc-700 text-base font-medium  font-primary overflow-auto scrollbar '}>
						{list.description}
					</pre>
				)}
				<Separator />
			</div>
			<PostsList />
		</section>
	)
}
export default ListPage
