'use client'

import { Skeleton } from '@/components/ui'
import { useTagsQuery } from '@/services'
import { TAGS_TAKE_LIMIT } from '@/shared/config'
import { Routes } from '@/shared/constants'
import Link from 'next/link'

export const Topics = () => {
	const { data, loading } = useTagsQuery({ take: TAGS_TAKE_LIMIT })
	return (
		<div className={'flex flex-col gap-y-2'}>
			<h2 className={'text-gray-primary font-bold text-base'}>Discover more of what matters to you</h2>
			<div className={'flex flex-wrap gap-4'}>
				{data?.tags.map((tag) => (
					<Link
						href={`${Routes.TAG}/${tag.name}`}
						className={
							'flex items-center gap-x-2 justify-center py-2 px-4  min-w-max text-zinc-800  border border-zinc-50 bg-zinc-50 rounded-2xl hover:border-zinc-500 transition-all'
						}
						key={tag.id}
					>
						{tag.name}
					</Link>
				))}
                {loading && (
                    <Topics.Skeleton />
                )}
			</div>
			<Link
				className={'text-green-700 pl-2 hover:text-zinc-800 transition-all text-base'}
				href={Routes.EXPLORE_TOPICS}
			>
				See more topics
			</Link>
		</div>
	)
}


Topics.Skeleton = function TopicsSkeleton() {
    const fakeArray = new Array(TAGS_TAKE_LIMIT).fill(0)
    return fakeArray.map((_,index) => (
        <Skeleton key={index} className={
            ' w-20 h-8   border border-zinc-50 bg-zinc-50 rounded-2xl transition-all'
        } />
    ))
}