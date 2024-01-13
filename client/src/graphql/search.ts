import { gql } from '@apollo/client'

export const SEARCH_QUERY = gql`
	query SearchQuery($searchValue: String, $take: Int) {
		users: searchUsers(query: { searchValue: $searchValue, take: $take }) {
			id
			username
			avatar {
				url
			}
		}
		tags: findManyTags(
			query: { searchValue: $searchValue, take: $take, sortBy: "name" }
		) {
			id
			name
		}
		posts: findAllPosts(query: { searchValue: $searchValue, take: $take }) {
			id
			image {
				url
			}
			title
		}
		lists:findManyLists(query: {
			take: $take 
			searchValue: $searchValue
		}) {
			id
			name
			public
			creator {
				id
				username
				avatar {
					url
				}
			}
		}
	} 
`

export const POST_SEARCH_QUERY = gql`
	query SearchQuery(
		$searchValue: String
		$takeTags: Int
		$takePosts: Int
		$takeUsers: Int
	) {
		users: searchUsers(
			query: { searchValue: $searchValue, take: $takeUsers }
		) {
			id
			username
			avatar {
				url
			}
			about
		}
		tags: findManyTags(query: { searchValue: $searchValue, take: $takeTags }) {
			id
			name
		}
		posts: findAllPosts(
			query: { searchValue: $searchValue, take: $takePosts }
		) {
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
			_count {
				lists
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
		}
	}
`

export const PEOPLE_SEARCH_QUERY = gql`
	query SearchQuery(
		$searchValue: String
		$takeTags: Int
		$takePosts: Int
		$takeUsers: Int
	) {
		users: searchUsers(
			query: { searchValue: $searchValue, take: $takeUsers }
		) {
			id
			username
			avatar {
				url
			}
			about
		}
		tags: findManyTags(query: { searchValue: $searchValue, take: $takeTags }) {
			id
			name
		}
		posts: findAllPosts(
			query: { searchValue: $searchValue, take: $takePosts }
		) {
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
		}
	}
`

export const TAGS_SEARCH_QUERY = gql`
	query SearchQuery(
		$searchValue: String
		$takeTags: Int
		$takePosts: Int
		$takeUsers: Int
	) {
		users: searchUsers(
			query: { searchValue: $searchValue, take: $takeUsers }
		) {
			id
			username
			avatar {
				url
			}
			about
		}
		tags: findManyTags(query: { searchValue: $searchValue, take: $takeTags }) {
			id
			name
		}
		posts: findAllPosts(
			query: { searchValue: $searchValue, take: $takePosts }
		) {
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
		}
	}
`


export const LISTS_SEARCH_QUERY = gql`
	query SearchQuery($searchValue: String
		$takeTags: Int
		$takePosts: Int
		$takeUsers: Int
		$takeLists: Int
		$withoutCurrentUserLists: Boolean) {
		lists: findManyLists(query: { searchValue: $searchValue, take: $takeLists, withoutCurrentUserLists: $withoutCurrentUserLists }) {
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
		users: searchUsers(
			query: { searchValue: $searchValue, take: $takeUsers }
		) {
			id
			username
			avatar {
				url
			}
			about
		}
		tags: findManyTags(query: { searchValue: $searchValue, take: $takeTags }) {
			id
			name
		}
		posts: findAllPosts(
			query: { searchValue: $searchValue, take: $takePosts }
		) {
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
		}
	}
`