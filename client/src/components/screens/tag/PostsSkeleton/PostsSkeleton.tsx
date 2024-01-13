import { Skeleton } from '@/components/ui'
import { POSTS_LOADING_SKELETONS_COUNT } from '@/shared/config'

import styles from './PostsSkeleton.module.scss'
import { ClapIcon } from '@/components/icons'
import { MessageCircle } from 'lucide-react'

export const PostsSkeleton = () => {
	const fakeArray = new Array(POSTS_LOADING_SKELETONS_COUNT).fill('')

	return (
		<>
			{fakeArray.map((_, index) => (
				<div key={index} className={styles.skeleton}>
					<Skeleton className={styles.image} />
					<div className={styles.create__info}>
						<div className={styles.creator}>
							<Skeleton className={styles.avatar} />
							<Skeleton className={styles.username} />
						</div>
						<Skeleton className={styles.time} />
					</div>
					<Skeleton className={styles.title} />
					<Skeleton className={styles.description} />
					<div className={styles.actions}>
						<div className={styles.claps}>
							<ClapIcon width={'1.5rem'} height="1.5rem" />
							<>--</>
						</div>
						<div className={styles.comments}>
							<MessageCircle />
							<>--</>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
