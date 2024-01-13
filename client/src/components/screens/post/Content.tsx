'use client'

import { useAuth } from '@/components/providers'
import { Button, buttonVariants } from '@/components/ui'
import { EditorOutput, absolutePath } from '@/lib'
import { useSubscription } from '@/services'
import { Modals, Routes, proModalFeatures } from '@/shared/constants'
import { TypeFindPostByIdResponse } from '@/shared/types'
import { useModalStore } from '@/store'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

interface IContentProps {
	post: TypeFindPostByIdResponse
}

export const Content = ({ post }: IContentProps) => {
	const { user } = useAuth()
	const [subscribe, { loading }] = useSubscription()
	const {onOpen} = useModalStore()

	const onClick = () => subscribe(absolutePath(`${Routes.POSTS}/${post.id}`))

	if (!user && !post.public) {
		return (
			<section className="w-full flex flex-col justify-center items-center gap-y-3">
				<h2 className="md:text-3xl text-xl sm:text-2xl text-zinc-800 font-secondary font-medium text-center">
					Create an account to read the story.
				</h2>
				<p className="text-center text-base text-zinc-600">
					The author made this story available to Podium members only. If you’re
					new to Podium, create a new account to read this story on us.
				</p>
				<Button
					onClick={() => onOpen(Modals.AUTH)}
					className={buttonVariants({
						variant: 'sky',
						className: ' flex w-[12.5rem] items-center gap-x-1'
					})}
				>
					Sign Up
				</Button>
			</section>
		)
	}

	if (!user?.subscribed && !post.public && user?.id !== post.creator.id) {
		return (
			<section className="w-full flex flex-col justify-center items-center gap-y-3">
				<h2 className="md:text-3xl text-xl sm:text-2xl text-zinc-800 font-secondary font-medium text-center">
					Read this story from {post.creator.username} — and all the best
					stories on Podium.
				</h2>
				<p className="text-center text-base text-zinc-600">
					The author made this story available to Podium members only. Upgrade
					to instantly unlock this story plus other member-only benefits.
				</p>
				<ul className="text-base list-disc">
					{proModalFeatures.map((feature, index) => (
						<li key={index}>{feature}</li>
					))}
				</ul>
				<Button
					variant={'sky'}
					onClick={onClick}
					className=" flex w-[12.5rem] items-center gap-x-1"
				>
					{loading && <Loader2 className={'animate-spin'} />}
					Upgrade
				</Button>
			</section>
		)
	}

	return <EditorOutput data={JSON.parse(post.content!)} />
}
