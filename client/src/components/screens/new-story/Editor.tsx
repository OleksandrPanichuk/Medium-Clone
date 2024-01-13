'use client'

import { useEffect, useState } from 'react'
import { useEditor } from './EditorProvider'
import { useAuth } from '@/components/providers'
import { AlertCircle } from 'lucide-react'
import { useGetUserPostsCountQuery } from '@/services'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'

export const Editor = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	const { initializeEditor, ref } = useEditor()
	const { user } = useAuth()
	const { data, loading } = useGetUserPostsCountQuery()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		const init = async () => {
			await initializeEditor()
		}

		if (isMounted && !loading) {
			init()

			return () => {
				ref.current?.destroy()
				ref.current = undefined
			}
		}
	}, [isMounted, initializeEditor, ref, loading])

	if (!user?.verified) {
		return (
			<div className="w-full border-t border-zinc-50 h-fit">
				<div className="flex items-center gap-x-2 p-4 sm:px-16">
					<AlertCircle className="stroke-orange-500 " />
					<p className={'text-base text-zinc-700'}>
						Please confirm your email address to create a story. You can do this
						on the settings page
					</p>
				</div>
			</div>
		)
	}

	if (
		!user?.subscribed &&
		data?.posts &&
		data.posts >= SUBSCRIPTION_LIMITS.POSTS
	) {
		return (
			<div className="w-full border-t border-zinc-50 h-fit">
				<div className="flex items-center gap-x-2 p-4 sm:px-16">
					<AlertCircle className="stroke-rose-600 " />
					<p className={'text-base text-zinc-700'}>
						You have reached the limit of the free tier. Please upgrade your
						plan to get unlimited access
					</p>
				</div>
			</div>
		)
	}

	if (loading) return null

	return (
		<div className="w-full border-t border-zinc-50 h-fit">
			<form className="w-full pt-4 px-4 sm:px-16">
				<div className="prose prose-stone dark:prose-invert">
					<div id="editor" className="editor" />
					<p className="text-sm text-gray-500 h-10 flex items-center px-4">
						Use{' '}
						<kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
							Tab
						</kbd>{' '}
						to open the command menu.
					</p>
				</div>
			</form>
		</div>
	)
}
