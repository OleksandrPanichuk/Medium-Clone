import { TypeTag } from '@/shared/types'

export type TypeCreatePostResponse = {
	post: {
		id: string
	}
}

export type TypeUpdatePostClapsResponse = {
	clap: {
		_count: {
			claps: number
		}
		id: string | null
	}
}

export type TypeBasePost = {
	id: string
	image: {
		url: string
	}
	title: string
	description: string
	creator: {
		id: string
		avatar?: {
			url: string
		}
		username: string
	}
	createdAt: Date
	public: Boolean
}

export type TypeFindPostsForTagPageResponse = TypeBasePost & {
	_count: {
		comments: number
		claps: number
		lists:number
	}
	claps: {
		userId: string
	}[]
}

export type TypeFindPostByIdResponse = TypeBasePost & {
	_count: {
		comments: number
		lists:number
	}
	tags: {
		tag: TypeTag
	}[]
	content?: string
}

export type TypePostClap = {
	id: string
	userId: string
	postId: string
}

export type TypeFindPostsResponse = TypeBasePost & {
	tags: {
		tag: TypeTag
	}[]
	_count: {
		lists:number
	}
}

export type TypeListPost = TypeFindPostsResponse & {note?:string}


export type TypeTrendingPost = {
	id :string
	creator: {
		username: string 
		avatar?: {
			url :string
		}
		id:string
	}
	public :boolean
	createdAt :Date 
	title :string
}