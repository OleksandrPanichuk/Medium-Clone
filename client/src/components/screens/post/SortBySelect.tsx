'use  client'
import { Select } from '@/components/ui'
import { SingleValue } from 'react-select'
import type { TypeCommentsOrderSelectOption } from '@/shared/types'
import { commentsOrderSelectOptions } from '@/shared/constants'
import { usePostContext } from '@/components/screens/post'

export const SortBySelect = () => {
	const { setSortBy, sortBy } = usePostContext()
	return (
		<Select<TypeCommentsOrderSelectOption>
			onChange={(value) =>
				setSortBy(
					(value as unknown as SingleValue<TypeCommentsOrderSelectOption>)
						?.value ?? 'createdAt'
				)
			}
			defaultValue={commentsOrderSelectOptions.find(
				(option) => option.value === sortBy
			)}
			options={commentsOrderSelectOptions}
			styles={{
				option: (styles, { isSelected }) => {
					return {
						...styles,
						backgroundColor: isSelected ? 'rgba(24, 24, 27, .1)' : 'white',
						color: 'rgba(24, 24, 27, .9)'
					}
				}
			}}
		/>
	)
}
