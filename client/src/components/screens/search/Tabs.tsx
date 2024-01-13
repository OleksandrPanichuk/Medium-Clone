import { searchTabs, TypeSearchTab } from '@/shared/constants'
import { cn } from '@/lib'
import Link from 'next/link'
import { Separator } from '@/components/ui'

interface ITabsProps {
	q: string
	activeTab: TypeSearchTab['tab']
}

export const Tabs = ({ q, activeTab }: ITabsProps) => {
	return (
		<>
			<div className={'flex items-center gap-x-4 relative z-10'}>
				{searchTabs.map((tab) => (
					<div
						key={tab.href}
						className={cn(
							'py-4',
							tab.tab === activeTab && 'border-b border-zinc-900'
						)}
					>
						<Link
							className={cn(
								'text-zinc-600 text-base',
								tab.tab === activeTab && 'text-zinc-900'
							)}
							href={`${tab.href}?q=${q}`}
						>
							{tab.title}
						</Link>
					</div>
				))}
			</div>
			<Separator className={'-mt-[1px] mb-4'} />
		</>
	)
}
