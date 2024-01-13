import * as React from 'react'

import { cn } from '@/lib/utils'

import { cva, VariantProps } from 'class-variance-authority'

export const inputVariants = cva('input', {
	variants: {
		variant: {
			default: 'input--default',
			form: 'input--form  '
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})
export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type,variant, ...props }, ref) => {
		return <input type={type} className={cn(inputVariants({variant, className}))} ref={ref} {...props} />
	}
)
Input.displayName = 'Input'

export { Input }
