import { getPosts, getTagByName } from '@/services'
import { Topics } from '@/components/common'
import { Container, Separator } from '@/components/ui'
import { notFound, redirect } from 'next/navigation'
import { Dot } from 'lucide-react'

import { formatNumber } from '@/lib'
import { Posts } from '@/components/screens/tag'
import { FIND_POSTS_FOR_TAG_PAGE } from '@/graphql'
import { TypeFindPostsForTagPageResponse } from '@/shared/types'
import { Metadata } from 'next'
import { constructMetadata } from '@/shared/metadata/tag'

import styles from './page.module.scss'

interface IPageProps {
	params: {
		tagName: string
	}
	searchParams: {
		error: 'tag' | 'posts'
	}
}


export async function generateMetadata({params}:IPageProps):Promise<Metadata> {
	return constructMetadata({tag:params.tagName})
}

const Page = async ({ params, searchParams }: IPageProps) => {

	if (searchParams.error) {
		throw new Error('Error')
	}

	const tag = await getTagByName(params.tagName)

	if (typeof tag === 'undefined') return redirect(`/tag/${params.tagName}?error=tag`)

	if (!tag) return notFound()

	const initialPosts = await getPosts<TypeFindPostsForTagPageResponse>({
		query: FIND_POSTS_FOR_TAG_PAGE,
		variables: {
			tag: params.tagName
		}
	})

	if (typeof initialPosts === 'undefined') {
		return redirect(`/tag/${params.tagName}?error=posts`)
	}

	return (
		<>
			<Topics selectedTag={params.tagName} />
			<section className={styles.tag}>
				<h2 className={styles.tag__name}>{tag.name}</h2>
				<div className={styles.tag__info}>
					<span>Topic</span>
					<Dot />
					<span>
						{formatNumber(tag._count.posts)}{' '}
						{tag._count.posts === 1 ? 'Story' : 'Stories'}
					</span>
				</div>
			</section>
			<Separator />
			<Container as="section">
				<h4 className={styles.recommended}>Recommended stories</h4>
				<Posts initialPosts={initialPosts} />
			</Container>
		</>
	)
}

export default Page
