import  type {
	TypeBasePost,
	TypeBaseUser,
	TypeFindManyList,
	TypeFindPostsResponse,
	TypeTag
} from '@/shared/types'

export type TypeSearchResponse = {
	users: TypeSearchUser[]
	tags: TypeSearchTag[]
	posts: TypeSearchPost[]
	lists: TypeSearchList[]
}

export type TypeSearchPost = {
	id: string
	image: {
		url: string
	}
	title: string
}
export type TypeSearchTag = TypeTag
export type TypeSearchUser = {
	id: string
	username: string
	avatar: {
		url?: string
	}
}

export type TypeSearchList = {
	id:string 
	name: string 
	public : boolean
	creator: {
		id:string
		username:string 
		avatar?: {
			url:string
		}
	}
	
}

export type TypePostsSearch = {
	posts: TypeFindPostsResponse[]
	users: TypeBaseUser[]
	tags: TypeTag[]
}

export type TypePeopleSearch = {
	posts: Omit<TypeBasePost, 'description'>[]
	users: (TypeBaseUser & {
		about?: string
	})[]
	tags: TypeTag[]
}

export type TypeTagSearch = {
	tags: TypeTag[]
	posts: Omit<TypeBasePost, 'description'>[]
	users: TypeBaseUser[]
}

export type TypeListsSearch = {
	tags: TypeTag[]
	posts: Omit<TypeBasePost, 'description'>[]
	users: TypeBaseUser[]
	lists: TypeFindManyList[]
}

export interface ISearchPageProps {
	searchParams: {
		q?: string
	}
}
