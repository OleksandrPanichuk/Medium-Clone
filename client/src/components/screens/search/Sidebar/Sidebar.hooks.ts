import { Routes } from '@/shared/constants'
import { useRouter } from 'next/navigation'

type NavigateType = 'people' | 'tags' | 'posts'

export const useSidebarNavigate = () => {
	const router = useRouter()

	return (type: NavigateType, property: string) => {
		if (type === 'people') {
			router.push(`${Routes.PROFILE}/${property}`)
		}

		if (type === 'posts') {
			router.push(`${Routes.POSTS}/${property}`)
		}

		if (type === 'tags') {
			router.push(`${Routes.TAG}/${property}`)
		}
	}
}