export type TypeTag = {
	id: string
	name: string
}
export type TypeTagExtended = TypeTag & {
	_count: {
		posts: number
	}
}
