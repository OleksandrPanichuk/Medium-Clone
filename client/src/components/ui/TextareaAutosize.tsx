'use client'
import { cn } from '@/lib'
import { forwardRef } from 'react'
import TextareaAutosizePrimary, {
	TextareaAutosizeProps
} from 'react-textarea-autosize'
import { cva, VariantProps } from 'class-variance-authority'

export const textareaAutosizeVariants = cva('textarea-autosize', {
	variants: {
		variant: {
			default: 'textarea-autosize--default',
			secondary: 'textarea-autosize--secondary',
			form: 'textarea-autosize--form'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

interface ITextareaAutosizeProps
	extends TextareaAutosizeProps,
		VariantProps<typeof textareaAutosizeVariants> {}

export const TextareaAutosize = forwardRef<
	HTMLTextAreaElement,
	ITextareaAutosizeProps
>(({ className, variant, ...rest }, ref) => {
	return (
		<TextareaAutosizePrimary
			ref={ref}
			className={cn(textareaAutosizeVariants({ variant, className }))}
			{...rest}
		/>
	)
})

TextareaAutosize.displayName = 'TextareaAutosize'
