import { Loader2 } from 'lucide-react'

export const Loading = () => {
	return (
		<div
			className={`loading-wrapper`}
		>
			<div className={'flex flex-col items-center gap-y-4'}>
				<span className="text-2xl text-zinc-800">Just give us a second</span>
				<Loader2 className="animate-spin w-8 h-8" />
			</div>
		</div>
	)
}
