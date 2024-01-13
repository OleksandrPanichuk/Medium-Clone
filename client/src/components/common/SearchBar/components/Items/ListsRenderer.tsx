import { TypeSearchList } from '@/shared/types'
import styles from './styles.module.scss'
import { Separator } from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'
import { List } from 'lucide-react'

interface IListsRendererProps {
	lists: TypeSearchList[]
}

export const ListsRenderer = ({ lists }: IListsRendererProps) => {
	if (!lists.filter(list => list.public).length) return null

	return (
		<>
			<h3 className={styles.heading}>Lists</h3>
			<Separator />
            {lists.map(list =>  (
                <li  className={styles.item} key={list.id}>
                    <Link href={`${Routes.PROFILE}/${list.creator.id}/${Routes.LISTS}/${list.id}`}>
                        <List className={styles.icon} />
                        <p className={'flex-1'}>{list.name} {' '}
                        <span className={styles['created-by']}>by {list.creator.username}</span>
                        </p>{' '}
                        

                    </Link>
                </li>
            ))}
		</>
	)
}
