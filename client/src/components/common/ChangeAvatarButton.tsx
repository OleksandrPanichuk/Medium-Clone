'use client'

import { useAuth } from '@/components/providers'

import Dropzone from 'react-dropzone'
import { Avatar, Label } from '@/components/ui'
import { ControllerRenderProps } from 'react-hook-form'
import { useState } from 'react'
import { cn } from '@/lib'

interface IChangeAvatarButtonProps {
	field: ControllerRenderProps<{ file?: File }, 'file'>
	disabled?: boolean
	className?:string
}

const ChangeAvatarButton = ({ field, disabled, className }: IChangeAvatarButtonProps) => {
	const { user } = useAuth()
	const [src, setSrc] = useState<string | undefined>(user?.avatar?.url)

	function onFileDrop(file: File) {
		const reader = new FileReader()

		field.onChange(file)

		reader.onload = function (event) {
			if (event.target?.result) {
				const csv = event.target.result

				setSrc(typeof csv === 'string' ? csv : Buffer.from(csv).toString())
			}
		}

		reader.readAsDataURL(file)
	}

	return (
		<Label className={cn('flex items-center gap-x-2 cursor-pointer',disabled &&'cursor-not-allowed' , className)}>
			<Dropzone
				disabled={disabled}
				onDrop={(files) => onFileDrop(files[0])}
				multiple={false}
				maxFiles={1}
				accept={{
					'image/*': ['.jpeg', '.png', '.avif', '.svg', '.jpg', '.wepb']
				}}
			>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} disabled={disabled} name={field.name} />
						<Avatar src={src} name={user?.username} />
					</div>
				)}
			</Dropzone>
			<p aria-disabled={disabled} className={'text-zinc-700 text-sm'}>Change avatar</p>
		</Label>
	)
}

export default ChangeAvatarButton
