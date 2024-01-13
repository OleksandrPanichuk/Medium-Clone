"use client"
import React from 'react'
import { ISearchPageProps, TypeTagSearch } from '@/shared/types'
import { notFound } from 'next/navigation'
import { useMultipleSearchQuery } from '@/services'

import { Sidebar, Tabs } from '@/components/screens/search'
import { TagsList } from '@/components/screens/search/tags'
import { Loading } from '@/components/common'

const Page =  ({ searchParams }: ISearchPageProps) => {
	const {data, loading} = useMultipleSearchQuery<TypeTagSearch>(searchParams.q, 'TAGS')
	
	if (!searchParams?.q) {
		return notFound()
	}

	if(loading && typeof data === 'undefined') {
		return <Loading />
	}

	return (
		<div className="flex ">
			<div className="flex-[60%]">
				<div className={'max-w-2xl my-16 w-full flex flex-col mx-auto px-4'}>
					<h1 className={'text-5xl text-zinc-500 font-semibold mb-4'}>
						Results for{' '}
						<span className={'text-zinc-900 '}>{searchParams.q}</span>
					</h1>
					<Tabs activeTab={'tags'} q={searchParams.q} />
					{data?.tags.length ? (
						<TagsList initialTags={data.tags} />
					) : (
						<p className={'font-secondary text-zinc-600 my-8'}>
							Make sure all words are spelled correctly. <br />
							Try different keywords. <br />
							Try more general keywords.
						</p>
					)}
				</div>
			</div>
			{(!!data?.posts.length || !!data?.users.length) && (
				<Sidebar
					searchValue={searchParams.q}
					posts={data?.posts}
					users={data?.users}
				/>
			)}
		</div>
	)
}

export default Page
