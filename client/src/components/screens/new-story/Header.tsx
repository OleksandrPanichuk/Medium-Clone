'use client'
import { Logo, UserButton } from '@/components/common'
import { Button, Header as HeaderPrimary } from '@/components/ui'
import { useEditor } from '@/components/screens/new-story'
import { useAuth } from '@/components/providers'
import { useGetUserPostsCountQuery } from '@/services'
import { SUBSCRIPTION_LIMITS } from '@/shared/config'

interface IHeaderProps {
	onModalOpen?: () => void
}
const Header = ({ onModalOpen }: IHeaderProps) => {
	const { isEmpty } = useEditor()
	const { user } = useAuth()
	const { data, loading } = useGetUserPostsCountQuery()

	const disabled =
		!user?.subscribed && !!data?.posts && data.posts >= SUBSCRIPTION_LIMITS.POSTS
		
	return (
		<HeaderPrimary>
			<Logo className="flex-1" />
			<Button
				onClick={onModalOpen}
				disabled={isEmpty || !user?.verified || loading || disabled}
				className="bg-green-700 rounded-2xl border border-green-800 hover:bg-green-600"
			>
				Publish
			</Button>
			<UserButton />
		</HeaderPrimary>
	)
}

export default Header
