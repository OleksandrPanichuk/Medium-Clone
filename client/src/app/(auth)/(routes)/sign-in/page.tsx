import Image from 'next/image'
import { AuthForm } from '@/components/screens/auth'
import { Images } from '@/shared/constants'

const Page = () => {
	return (
		<>
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
					Join Podium
				</h2>
			</div>
			<AuthForm variant="LOGIN" />
		</>
	)
}

export default Page
