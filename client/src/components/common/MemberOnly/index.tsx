import { SparkleIcon } from '@/components/icons'
import styles from './MemberOnly.module.scss'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui'
import { useAuth } from '@/components/providers'
import { Modals } from '@/shared/constants'
import { useModalStore } from '@/store'

export const MemberOnly = () => {
	const { user } = useAuth()

	const {onOpen} = useModalStore()

	if (user?.subscribed) {
		return <Trigger />
	}

	return (
		<Popover toggleMode >
			<PopoverTrigger>
				<Trigger />
			</PopoverTrigger>
			<PopoverContent className={styles.content}>
				<h5 className={styles.title}>Member-only Story</h5>
				<p className={styles.text}>
					Become a Podium member to enjoy unlimited access.
				</p>
				<Button
					onClick={() => onOpen(user ? Modals.PRO : Modals.AUTH)}
					className={styles.button}
				>
					Get unlimited access
				</Button>
			</PopoverContent>
		</Popover>
	)
}

const Trigger = () => {
	return (
		<div className={styles.trigger}>
			<SparkleIcon width={'1rem'} height={'1rem'} />
			<span>Member Only</span>
		</div>
	)
}
