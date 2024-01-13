'use client'
import { MultiValue } from 'react-select'
import { Select } from '@/components/ui'
import { ControllerRenderProps } from 'react-hook-form'
import { TypeTagExtended } from '@/shared/types'
import { TAGS_QUERY } from '@/graphql'
import { useQuery } from '@apollo/client'
import { formatNumber } from '@/lib'
import { useTagsQuery } from '@/services'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks'
import { Loader2 } from 'lucide-react'
import { TAGS_TAKE_LIMIT } from '@/shared/config'

interface ITagsSelectProps {
	field: ControllerRenderProps<any, 'tags'>
	className?: string
	loading: boolean
}

type TypeTagOption = {
	id: string
	label: JSX.Element
	value: string
}

export const TagsSelect = ({ field, className, loading }: ITagsSelectProps) => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [tags, setTags] = useState<TypeTagExtended[]>([])

	const debouncedSearchValue = useDebounce(searchValue)

	const { loading: isTagsLoading } = useTagsQuery(
		debouncedSearchValue
			? {
					searchValue: debouncedSearchValue,
					take: TAGS_TAKE_LIMIT,
					sortBy: 'name'
			  }
			: {
					take: TAGS_TAKE_LIMIT,
					sortBy: 'posts',
					sortOrder: 'desc'
			  },
		{
			onCompleted: (data) => {
				setTags(data.tags)
			}
		}
	)

	useEffect(() => {
		setTags([])
	}, [searchValue])

	return (
		<Select<TypeTagOption>
			isDisabled={loading}
			isMulti={true}
			className={className}
			onChange={(options) =>
				field.onChange(
					(options as unknown as MultiValue<TypeTagOption>)?.map(
						(option) => option.id
					)
				)
			}
			inputValue={searchValue}
			onInputChange={(value) => setSearchValue(value)}
			options={
				isTagsLoading
					? [
							{
								id: 'id',
								value: searchValue,
								label: (
									<div className={'flex gap-x-2 items-center'}>
										<Loader2 className="animate-spin" />
										Loading...
									</div>
								)
							}
					  ]
					: tags.map((tag) => ({
							label: (
								<div className={'flex justify-between items-center'}>
									{tag.name}
									<span>{formatNumber(tag._count.posts)}</span>
								</div>
							),
							value: tag.name,
							id: tag.id
					  }))
			}
			isSearchable={true}
			classNames={{
				multiValueLabel: () => 'span-hidden'
			}}
		/>
	)
}
