import { Routes } from "./constants"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const APP_URL =
	process.env.NEXT_PUBLIC_APP_URL ?? `http://localhost:3000`

export const STORY_BLOCKS_COUNT_FOR_PRIVATE_MODE = 20
export const SEARCH_TAKE_LIMIT = 5

export const SESSION_COOKIE_NAME = 'podium:session'
export const DEFAULT_LIST_NAME = 'Reading list'
export const RECENT_SEARCHES_KEY = 'podium:recent-searches'

export const INITIAL_POSTS_LIMIT = 12

export const POSTS_INCREMENT = 6
export const POSTS_LOADING_SKELETONS_COUNT = 6

export const TAGS_TAKE_LIMIT = 10
export const TAGS_INCREMENT = 10

export const PEOPLE_INCREMENT = 10


export const COMMENTS_INCREMENT = 20

export const SEARCH_POSTS_TAKE = {
	POSTS: 12,
	PEOPLE: 3,
	TAGS: 6
} as const
export const SEARCH_TAGS_TAKE = {
	POSTS: 3,
	PEOPLE: 3,
	TAGS: 10
} as const
export const SEARCH_PEOPLE_TAKE = {
	POSTS: 3,
	PEOPLE: 12,
	TAGS: 6
} as const 

export const SEARCH_LISTS_TAKE = {
	POSTS: 3,
	TAGS:6,
	PEOPLE:3,
	LISTS: 12
}  as const

export const INITIAL_LISTS_LIMIT = 8
export const LISTS_INCREMENT = 8
export const LISTS_LOADING_SKELETONS_COUNT = 4

export const MAX_LIST_DESCRIPTION_LENGTH = 280
export const MAX_LIST_NAME_LENGTH = 60



export const TRENDING_POSTS_COUNT = 6



export const RESET_PASSWORD_LINK_BASE = APP_URL + Routes.FORGOT_PASSWORD
export const VERIFY_EMAIL_LINK_BASE = APP_URL + Routes.VERIFY_EMAIL


export const DEFAULT_REDIRECT_URL = APP_URL


export const SUBSCRIPTION_LIMITS = {
    POSTS: 4,
    LISTS: 1,
    POSTS_PER_LIST: 5
} as const