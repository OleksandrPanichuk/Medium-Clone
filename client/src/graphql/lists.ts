import { gql } from '@apollo/client'

export const FIND_MANY_LISTS = gql`
	query FindManyLists($query: FindManyListsInput!) {
		lists: findManyLists(query: $query) {
			creator {
				avatar {
					url
				}
				username
				id
			}
			_count {
				posts
			}
			description
			name
			public
			id
		}
	}
`

export const FIND_LIST = gql`
	query Query($input: FindListByIdInput!, $query: FindListPostsInput!) {
		list: findListById(input: $input) {
			creator {
				avatar {
					url
				}
				id
				username
			}
			description
			name
			public
			id
			_count {
				posts
			}
			createdAt
		}
		posts: findListPosts(input: $query) {
			id
			creator {
				username
				avatar {
					url
				}
				id
			}
			image {
				url
			}
			public
			createdAt
			title
			description
			tags {
				tag {
					name
					id
				}
			}
			note
		}
	}
`
export const CREATE_LIST = gql`
	mutation CreateList($input: CreateListInput!) {
		list: createList(input: $input) {
			creator {
				avatar {
					url
				}
				username
				id
			}
			_count {
				posts
			}
			description
			name
			public
			id
		}
	}
`
export const UPDATE_LIST = gql`
	mutation UpdateList($input: UpdateListInput!) {
		list: updateList(input: $input) {
			creator {
				avatar {
					url
				}
				username
				id
			}
			_count {
				posts
			}
			description
			name
			public
			id
		}
	}
`

export const UPDATE_NOTE = gql`
	mutation Mutation($input: UpdateNoteInput!) {
		post: updateNote(input: $input) {
			note
		}
	}
`

export const FIND_MANY_LISTS_FOR_POSTS = gql`
	query FindManyLists($query: FindManyListsInput!) {
		lists: findManyLists(query: $query) {
			name
			id
			posts {
				id
			}
			public
		}
	}
`

export const ADD_POST_TO_LIST = gql`
	mutation Mutation($input: AddPostToListInput!) {
		result: addPostToList(input: $input) {
			message
		}
	}
`

export const REMOVE_POST_FROM_LIST = gql`
	mutation RemovePostFromList($input: RemovePostFromListInput!) {
		result: removePostFromList(input: $input) {
			message
		}
	}
`

export const DELETE_LIST = gql`
	mutation DeleteList($input: DeleteListInput!) {
		message: deleteList(input: $input)
	}
`
