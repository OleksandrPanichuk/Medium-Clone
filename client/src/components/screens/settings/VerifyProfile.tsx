'use client'

import { useAuth } from '@/components/providers'
import { Button, Checkbox, Label } from '@/components/ui'
import { useSendVerificationLink } from '@/services'

export const VerifyProfile = () => {
	const { user } = useAuth()

	const [sendVerificationLink] = useSendVerificationLink()
	return (
		<div className='flex items-center justify-between  gap-x-2'>
			<Label className={'flex items-center gap-x-1'}>
				<Checkbox disabled aria-disabled checked={user?.verified} />
				Verified
			</Label>
			{user !== null &&  !user.verified  && (
				<Button onClick={sendVerificationLink}>Verify</Button>
			)}
		</div>
	)
}
