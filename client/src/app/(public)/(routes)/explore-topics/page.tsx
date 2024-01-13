import { Topics } from '@/components/common'
import { TopicsSearch } from '@/components/screens/explore-topics'
import styles from './page.module.scss'
import { Container } from '@/components/ui'
import { Metadata } from 'next'
import { constructMetadata } from '@/shared/metadata/explore-topics'
import './page.scss'

export const metadata: Metadata = constructMetadata()

const Page = () => {
	return (
		<>
			<Topics  />
			<Container className={styles.container}>
				<h2 className={styles.title}>Explore Topics</h2>
				<TopicsSearch />
			</Container>
		</>
	)
}

export default Page
