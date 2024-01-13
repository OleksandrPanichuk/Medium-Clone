"use client"
import { Sidebar, Tabs } from '@/components/screens/search'
import { notFound } from 'next/navigation'
import { useMultipleSearchQuery } from '@/services'
import { ISearchPageProps, TypePostsSearch } from '@/shared/types'
import { PostsList } from '@/components/screens/search/posts'
import { Loading } from '@/components/common'

const Page = ({ searchParams }: ISearchPageProps) => {
	const {data, loading} = useMultipleSearchQuery<TypePostsSearch>(searchParams.q, 'POSTS')

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
					<Tabs activeTab={'posts'} q={searchParams.q} />
					{data?.posts.length ? (
						<PostsList initialPosts={data.posts} />
					) : (
						<p className={'font-secondary text-zinc-600 my-8'}>
							Make sure all words are spelled correctly. <br />
							Try different keywords. <br />
							Try more general keywords.
						</p>
					)}
				</div>
			</div>
			{(!!data?.tags.length || !!data?.users.length) && (
				<Sidebar
					searchValue={searchParams.q}
					tags={data?.tags}
					users={data?.users}
				/>
			)}
		</div>
	)
}

export default Page
