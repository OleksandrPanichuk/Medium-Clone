'use client'

import {
	createContext,
	Dispatch,
	MutableRefObject,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useRef,
	useState
} from 'react'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { TypeFile } from '@/shared/types'
import { useFileUpload, useGetUserPostsCountQuery } from '@/services'
import { useAuth } from '@/components/providers'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'

interface IEditorContext {
	ref: MutableRefObject<EditorJS | undefined>
	images: TypeFile[]
	setImages: Dispatch<SetStateAction<TypeFile[]>>
	initializeEditor: () => Promise<void>
	isEmpty: boolean
	content: OutputData
}

export const EditorContext = createContext<IEditorContext>({} as IEditorContext)

export const EditorProvider = ({ children }: PropsWithChildren) => {
	const [images, setImages] = useState<TypeFile[]>([])
	const [isEmpty, setIsEmpty] = useState<boolean>(true)
	const [content, setContent] = useState<OutputData>({ blocks: [] })
	const ref = useRef<EditorJS>()
	const {user} = useAuth()
	const [uploadFile] = useFileUpload()

	const { data, loading } = useGetUserPostsCountQuery()

	const initializeEditor = useCallback(async () => {
		if(!user?.verified || (!user?.subscribed &&
			data?.posts &&
			data.posts >= SUBSCRIPTION_LIMITS.POSTS) || loading) {
			return
		}
		
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const Embed = (await import('@editorjs/embed')).default
		const Table = (await import('@editorjs/table')).default
		const List = (await import('@editorjs/list')).default
		const Code = (await import('@editorjs/code')).default
		const LinkTool = (await import('@editorjs/link')).default
		const InlineCode = (await import('@editorjs/inline-code')).default
		const Delimiter = (await import('@editorjs/delimiter')).default
		const Marker = (await import('@editorjs/marker')).default
		const Checklist = (await import('@editorjs/checklist')).default
		const ColorPlugin = (await import('editorjs-text-color-plugin')).default
		const Quote = (await import('@editorjs/quote')).default
		const Underline = (await import('@editorjs/underline')).default
		const Warning = (await import('@editorjs/warning')).default
		const FontSize = (await import('editorjs-inline-font-size-tool')).default
		const Tooltip = (await import('editorjs-tooltip')).default
		const Image = (await import('@editorjs/image')).default

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor
				},
				onChange: async (api) => {
					const content = await api.saver.save()
					setContent(content)
					if (content.blocks.length > 0) {
						return setIsEmpty(false)
					}
					if (!content.blocks.length) {
						return setIsEmpty(true)
					}
				},
				placeholder: 'Type here to write your post...',
				inlineToolbar: true,
				data: { blocks: [] },
				tools: {
					underline: Underline,
					quote: {
						class: Quote,
						inlineToolbar: true
					},
					image: {
						class: Image,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									const { data } = await uploadFile(file)

									if (!data) return { success: 0 }

									const uploadedFile = {
										url: data.file.url,
										key: data.file.key
									}

									setImages((prev) => [...prev, uploadedFile])
									return {
										success: 1,
										file: {
											url: uploadedFile.url
										}
									}
								}
							}
						}
					},
					header: {
						//@ts-ignore
						class: Header,
						inlineToolbar: true
					},
					delimiter: Delimiter,
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link'
						}
					},
					warning: Warning,
					list: {
						class: List,
						inlineToolbar: true
					},
					code: Code,
					inlineCode: InlineCode,
					table: {
						class: Table,
						inlineToolbar: true
					},
					embed: {
						class: Embed,
						inlineToolbar: true,
						config: {
							services: {
								youtube: true,
								facebook: true,
								instagram: true
							}
						}
					},
					tooltip: {
						class: Tooltip,
						config: {
							location: 'left',
							highlightColor: '#FFEFD5',
							underline: true,
							backgroundColor: '#154360',
							textColor: '#FDFEFE',
							holder: 'editorId'
						}
					},
					fontSize: FontSize,
					Marker: Marker,
					checklist: {
						class: Checklist,
						inlineToolbar: true
					},
					Color: {
						class: ColorPlugin,
						config: {
							colorCollections: [
								'#EC7878',
								'#9C27B0',
								'#673AB7',
								'#3F51B5',
								'#0070FF',
								'#03A9F4',
								'#00BCD4',
								'#4CAF50',
								'#8BC34A',
								'#CDDC39',
								'#FFF'
							],
							defaultColor: '#FF1300',
							type: 'text',
							customPicker: true
						}
					}
				}
			})
		}
	}, [uploadFile, ref, loading, data?.posts, user])

	return (
		<EditorContext.Provider
			value={{ ref, images, setImages, initializeEditor, isEmpty, content }}
		>
			{children}
		</EditorContext.Provider>
	)
}

export const useEditor = () => useContext(EditorContext)
