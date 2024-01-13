export type TypeBaseList = {
	id: string
	creatorId: string
	name: string
	public: boolean
	createdAt: Date
	description?: string
}

export type TypeListWithCreator = Omit<TypeBaseList, 'creatorId'> & {
	creator: {
		avatar?: {
			url: string
		}
		username: string
		id: string
	}
}
export type TypeListExtended = TypeListWithCreator & {
	_count: {
		posts: number
	}
}

export type TypeFindManyList = Omit<TypeListExtended, 'createdAt'>

export type TypeFindManyListForPost = {
	name: string
	id: string
	posts: {
		id: string
	}[]
	public: boolean
}

export type TypeCreateListResponse = TypeFindManyList
