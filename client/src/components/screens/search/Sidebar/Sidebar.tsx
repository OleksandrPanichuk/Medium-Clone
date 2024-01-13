'use client'
import type { TypeBasePost, TypeBaseUser, TypeTag } from '@/shared/types'
import styles from './Sidebar.module.scss'
import { Posts, Tags, Users } from './components'

interface ISidebarProps {
	posts?: Omit<TypeBasePost, 'description'>[]
	tags?: TypeTag[]
	users?: TypeBaseUser[]
	searchValue: string
}

export const Sidebar = ({ posts, tags, users, searchValue }: ISidebarProps) => {
	return (
		<aside className={styles.aside}>
			<div  className={styles.content}>
				{!!posts?.length && <Posts searchValue={searchValue} posts={posts} />}
				{!!tags?.length && <Tags searchValue={searchValue} tags={tags} />}
				{!!users?.length && <Users searchValue={searchValue} users={users} />}
			</div>
		</aside>
	)
}
