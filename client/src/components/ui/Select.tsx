'use client'
import type { TypeDefaultSelectOption } from '@/shared/types'
import ReactSelect, { Props } from 'react-select'



export function Select<T = TypeDefaultSelectOption>(props: Props<T>) {
	return (
		<ReactSelect
			{...props}
			classNames={{
				...props?.classNames,
				control: () => 'select__control'
			}}
		/>
	)
}