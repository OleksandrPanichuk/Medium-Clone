import Image from 'next/image'
import { BackButton, AuthForm } from '@/components/screens/auth'
import { Images } from '@/shared/constants'

const Page = ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
	return (
		<>
			{searchParams.callbackUrl && (
				<BackButton callbackUrl={searchParams.callbackUrl} />
			)}
			<div
				className={
					'mx-auto sm:w-full sm:max-w-md flex gap-x-2 items-center justify-center'
				}
			>
				<Image src={Images.LOGO} alt={'Logo'} height={48} width={48} />
				<h2
					className={
						'text-center text-3xl font-bold tracking-tight text-gray-900'
					}
				>
					Create an account
				</h2>
			</div>
			<AuthForm variant="REGISTER" />
		</>
	)
}

export default Page
