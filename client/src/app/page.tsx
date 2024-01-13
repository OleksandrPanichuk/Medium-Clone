import {
	Feed,
	Footer,
	Header,
	Hero,
	Sidebar,
	Topics,
	Trending
} from '@/components/screens/home'
import { Container, Separator } from '@/components/ui'
import { FIND_POSTS } from '@/graphql'
import { getPosts } from '@/services'
import { constructMetadata } from '@/shared/metadata'
import { TypeFindPostsResponse } from '@/shared/types'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'

export const metadata = constructMetadata()

export default async function Home() {
	const posts = await getPosts<TypeFindPostsResponse>({
		query: FIND_POSTS,
		variables: { sortBy: 'createdAt' }
	})

	if (!posts) throw new Error('Failed to get posts')

	return (
		<>
			<Header />
			<Hero />
			<Container>
				<Trending />
			</Container>
			<Separator />
			<div className={styles.main}>
				<div className={'md:hidden flex flex-col   gap-6 pt-6'}>
					<Container>
						<Topics />
					</Container>
					<Separator />
				</div>
				<Container>
					<Feed initialPosts={posts} />
				</Container>
				<Sidebar />
			</div>
			<Footer />
		</>
	)
}
