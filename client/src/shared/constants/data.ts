import { Routes } from '@/shared/constants/routes'
import type { TypeCommentsOrderSelectOption } from '@/shared/types'
import { Lock, LucideIcon, Mail, PenLine, Search, UserCircle2, Wallet } from 'lucide-react'

export type TypeSearchTab = {
	href: string
	title: string
	tab: 'posts' | 'people' | 'tags' | 'lists'
}
export const searchTabs: TypeSearchTab[] = [
	{
		href: Routes.SEARCH_POSTS,
		title: 'Stories',
		tab: 'posts'
	},
	{
		href: Routes.SEARCH_PEOPLE,
		title: 'People',
		tab: 'people'
	},
	{
		href: Routes.SEARCH_TAGS,
		title: 'Topics',
		tab: 'tags'
	}, {
		href: Routes.SEARCH_LISTS,
		title:'Lists',
		tab:'lists'
	}
]

export const commentsOrderSelectOptions: TypeCommentsOrderSelectOption[] = [
	{ label: 'Most Recent', value: 'createdAt' },
	{ label: 'Most Relevant', value: 'claps' }
]

type TypeProfileTab = {
	href: string
	title: string
	id: number
}

export const getProfileTabs = (
	isCurrentUser: boolean,
	userId: string
): TypeProfileTab[] => {
	return [
		{
			href: isCurrentUser ? Routes.PROFILE_ME : `${Routes.PROFILE}/${userId}`,
			title: 'Home',
			id: 1
		},
		{
			href: isCurrentUser
				? Routes.PROFILE_ME_LISTS
				: `${Routes.PROFILE}/${userId}${Routes.LISTS}`,
			title: 'Lists',
			id: 2
		},
		{
			href: isCurrentUser
				? Routes.PROFILE_ME_ABOUT
				: `${Routes.PROFILE}/${userId}${Routes.ABOUT}`,
			title: 'About',
			id: 3
		}
	]
}

interface IRoute {
	href: string
	name: string
	icon: LucideIcon
}

export const homeNavbarRoutes: IRoute[] = [
	{
		href: Routes.EXPLORE_TOPICS,
		name: 'Explore topics',
		icon: Search
	},
	{
		href: Routes.NEW_STORY,
		name: 'Write',
		icon: PenLine
	}
]

export const homeSidebarLinks: {href:string, text:string, id:number}[] = [
	{
		href:Routes.TERMS_OF_SERVICE,
		text: 'Terms',
		id:1
	},
	{
		href: Routes.PRIVACY_POLICY,
		text:'Privacy',
		id:2
	}
]

export const defaultConfirmModalTitle = 'Are you absolutely sure?'
export const defaultConfirmModalDescription = `This action cannot be undone. This will permanently delete it.`


export const proModalFeatures = ['Unlimited stories', 'Unlimited lists', 'Access to all stories', 'And more!']


export const settingsSidebarLinks: {title:string, id:string, icon:LucideIcon}[] = [
	{
		title: "Profile Information",
		id: "profile",
		icon: UserCircle2,
	},
	{
		title:'Verify Email',
		id:'verify',
		icon:Mail
	},
	{
		title: "Subscription Management", 
		id: "subscription",
		icon: Wallet
	}
]