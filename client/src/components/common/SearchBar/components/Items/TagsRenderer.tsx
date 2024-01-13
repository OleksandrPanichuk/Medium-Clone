import { TypeSearchTag } from '@/shared/types'
import styles from './styles.module.scss'
import { Separator } from '@/components/ui'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Routes } from '@/shared/constants'

interface ITagsRendererProps {
	tags: TypeSearchTag[]
}

export const TagsRenderer = ({ tags }: ITagsRendererProps) => {
	if (!tags.length) return null
	return (
		<>
			<h3 className={styles.heading}>Topics</h3>
			<Separator />
			{tags.map((tag) => (
				<li className={styles.item} key={tag.id}>
					<Link className={'truncate'} href={`${Routes.TAG}/${tag.name}`}>
						<FileText className={styles.icon} />
						{tag.name}
					</Link>
				</li>
			))}
		</>
	)
}
