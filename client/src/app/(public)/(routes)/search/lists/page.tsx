"use client"

import { Loading } from '@/components/common'
import { Sidebar, Tabs } from '@/components/screens/search'
import { ListsView } from '@/components/screens/search/lists'
import { useMultipleSearchQuery } from '@/services/apollo'

import { ISearchPageProps, TypeListsSearch } from '@/shared/types'
import { notFound } from 'next/navigation'

const Page = ({ searchParams }: ISearchPageProps) => {
	const {data,loading} = useMultipleSearchQuery<TypeListsSearch>(searchParams.q, 'LISTS')
	
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
					<Tabs activeTab={'lists'} q={searchParams.q} />
					{data?.lists.length ? (
						<ListsView initialLists={data.lists.filter(list => list.public)} />
					) : (
						<p className={'font-secondary text-zinc-600 my-8'}>
							Make sure all words are spelled correctly. <br />
							Try different keywords. <br />
							Try more general keywords.
						</p>
					)}
				</div>
			</div>
			{(!!data?.tags.length || !!data?.posts.length || !!data?.users.length) && (
				<Sidebar
					searchValue={searchParams.q}
					tags={data?.tags}
					posts={data?.posts}
					users={data?.users}
				/>
			)}
		</div>
	)
}

export default Page
