'use client'

import { useDebounce } from '@/hooks'
import { cn } from '@/lib'
import { useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'
import { Loader2, Search as SearchIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverInput } from '@/components/ui'
import { useRouter } from 'next/navigation'

import { useSearchQuery } from '@/services'
import {
	ExploreTopics,
	ListsRenderer,
	PostsRenderer,
	TagsRenderer,
	UsersRenderer
} from './components'
import { Routes } from '@/shared/constants'
import {useLocalStorage} from '@/hooks'
import { RECENT_SEARCHES_KEY } from '@/shared/config'

interface ISearchBarProps {
	className?: string
	contentClassName?:string
	triggerClassName?:string
}

export const SearchBar = ({ className, contentClassName, triggerClassName }: ISearchBarProps) => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(RECENT_SEARCHES_KEY, [])
	
	const debouncedSearchValue = useDebounce(searchValue, 500)

	const router = useRouter()

	const { data, loading } = useSearchQuery(debouncedSearchValue)

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Enter') {
				return
			}

			if (!isOpen || !data || !searchValue) {
				return
			}

			setRecentSearches([searchValue,...(recentSearches ?? []).filter(value => value !== searchValue)].slice(0, 10))

			router.push(`${Routes.SEARCH}?q=${searchValue}`)
		}

		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [searchValue, data, isOpen, recentSearches,setRecentSearches])

	return (
		<div className={className}>
			<Popover
				inheritWidth
				onOpenChange={(isOpen) => setIsOpen(isOpen)}
				className={"max-w-[280px] "}
			>
				<PopoverInput
					iconLeft={<SearchIcon className={styles.search__icon} />}
					placeholder="Search"
					wrapperClassName={triggerClassName}
					onChange={(event) => setSearchValue(event.target.value)}
				/>
				<PopoverContent  className={cn(styles.content, 'scrollbar', contentClassName)}>
					{searchValue && loading && (
						<div className={styles.loader}>
							<Loader2 className={'animate-spin'} />
							<p>Loading...</p>
						</div>
					)}
					<ul className={styles.list}>
						{searchValue && data && (
							<>
								<PostsRenderer posts={data.posts} />
								<UsersRenderer users={data.users} />
								<TagsRenderer tags={data.tags} />
								<ListsRenderer lists={data.lists} />
							</>
						)}
						<ExploreTopics
							data={data}
							searchValue={searchValue}
							debouncedSearchValue={debouncedSearchValue}
						/>
					</ul>
				</PopoverContent>
			</Popover>
		</div>
	)
}
