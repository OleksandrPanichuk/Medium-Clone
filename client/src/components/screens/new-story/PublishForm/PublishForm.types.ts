import { z } from 'zod'

export interface IPublishModalProps {
	isOpen: boolean
	onClose: () => void
}

export const formSchema = z.object({
	attachments: z
		.array(
			z.object({
				url: z.string(),
				key: z.string()
			})
		)
		.optional(),
	image: z.object({
		url: z.string(),
		key: z.string()
	}).refine(image => image.url && image.key),
	title: z.string().min(1).max(200),
	description: z.string().min(50).max(500),
	public:z.boolean(),
	tags: z
		.array(z.string())
		.min(1)
		.refine((tags) => tags.length > 0)
})

export type TypeFormData = z.infer<typeof formSchema>