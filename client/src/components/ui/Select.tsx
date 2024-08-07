'use client'
import type { TypeDefaultSelectOption } from '@/shared/types'
import ReactSelect, { Props } from 'react-select'
import ReactCreatableSelect from 'react-select/creatable';


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

export function CreatableSelect<T = TypeDefaultSelectOption>(props: Props<T>) {
	return (
		<ReactCreatableSelect
			{...props}
			classNames={{
				...props?.classNames,
				control: () => 'select__control'
			}}
		/>
	)
}