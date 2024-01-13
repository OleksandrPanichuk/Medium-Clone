'use client'

import { Dialog, DialogContent } from '@/components/ui'
import { Images, Modals, Routes } from '@/shared/constants'
import { useModalStore } from '@/store'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const AuthModal = () => {
	const { isOpen, type, onClose } = useModalStore()
	if (type !== Modals.AUTH) return null

	const continueWithGoogle = () => {
		window.location.href = process.env.NEXT_PUBLIC_GOOGLE_SIGN_IN_URL
	}
	const continueWithGitHub = () => {
		window.location.href = process.env.NEXT_PUBLIC_GITHUB_SIGN_IN_URL
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="flex flex-col items-center px-8">
				<h2 className="font-secondary font-medium text-2xl text-zinc-800">
					Join Podium
				</h2>
				<ul className={'flex flex-col gap-y-3'}>
					<li>
						<button
                        onClick={continueWithGoogle}
							className={
								'inline-flex gap-x-3 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
							}
						>
							<Image
								src={Images.GOOGLE_LOGO}
								alt="Google"
								width={24}
								height={24}
							/>
							<span>Sign Up with Google</span>
						</button>
					</li>
					<li>
						<button
                        onClick={continueWithGitHub}
							className={
								'inline-flex gap-x-3 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
							}
						>
							<Image
								src={Images.GITHUB_LOGO}
								alt="Github"
								width={24}
								height={24}
							/>
							<span>Sign Up with GitHub</span>
						</button>
					</li>
					<li>
						<Link
							className="inline-flex gap-x-3 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
							href={Routes.SIGN_UP}
                            onClick={onClose}
						>
							<Mail className={'w-6 h6'} />
							<span>Sign Up with Email</span>
						</Link>
					</li>
				</ul>
				<div className=" mt-6  px-2 ">
					<p className="text-sm text-gray-500">
						Already have an account?{' '}
						<Link
							href={Routes.SIGN_IN}
                            onClick={onClose}
							className="underline cursor-pointer text-gray-800"
						>
							Sign In
						</Link>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
