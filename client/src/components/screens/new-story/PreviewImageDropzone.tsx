'use client'
import { cn } from '@/lib'
import styles from './PublishForm/PublishForm.module.scss'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import { TypeFile } from '@/shared/types'
import { ControllerRenderProps } from 'react-hook-form'
import { useState } from 'react'
import { useFileUpload } from '@/services'

interface IPreviewImageDropzoneProps {
	field: ControllerRenderProps<any, 'image'>
	loading: boolean
}

export const PreviewImageDropzone = ({
	field,
	loading
}: IPreviewImageDropzoneProps) => {
	const [image, setImage] = useState<TypeFile | null>(null)
	const [uploadFile] = useFileUpload()

	const onDrop = async (
		files: File[],
		onChange: ({ url, key }: { url: string; key: string }) => void
	) => {
		try {
			const { data: uploadedFile } = await uploadFile(files[0])

			if (!uploadedFile?.file) return

			onChange(uploadedFile.file)

			setImage(uploadedFile.file)
		} catch (err) {
			return
		}
	}
	return (
		<Dropzone
			disabled={loading}
			onDrop={(files) => onDrop(files, field.onChange)}
			multiple={false}
			maxFiles={1}
			accept={{
				'image/*': ['.jpeg', '.png', '.avif', '.svg', '.jpg', '.wepb']
			}}
		>
			{({ getRootProps, getInputProps }) => (
				<section
					className={cn(styles.dropzone, !image && styles.dropzone__dashed)}
				>
					<div {...getRootProps()} className="w-full">
						<input {...getInputProps()} />
						{image ? (
							<div className={styles.image__wrapper}>
								<Image
									fill
									className={styles.image}
									alt={image.key}
									src={image.url}
								/>
							</div>
						) : (
							<p className={styles.dropzone__text}>
								Include a high-quality image in your story to make it more
								inviting to readers.
							</p>
						)}
					</div>
				</section>
			)}
		</Dropzone>
	)
}
