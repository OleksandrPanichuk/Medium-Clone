import { gql } from '@apollo/client'

export const FIND_POST_BY_ID = gql`
	query FindPostById($input: FindPostByIdInput!) {
		post: findPostById(input: $input) {
			content
			createdAt
			description
			id
			image {
				url
			}
			public
			title
			tags {
				tag {
					name
					id
				}
			}
			_count {
				comments
				lists
			}
			creator {
				avatar {
					url
				}
				username
				id
			}
		}
	}
`

export const CREATE_POST = gql`
	mutation CreatePost($input: CreatePostInput!) {
		post: createPost(input: $input) {
			id
		}
	}
`

export const TOGGLE_POST_CLAPS = gql`
	mutation TogglePostClaps($input: TogglePostClapsInput!) {
		clap: togglePostClaps(input: $input) {
			_count {
				claps
			}
			id
		}
	}
`

export const DELETE_POST = gql`
	mutation Mutation($input: DeletePostInput!) {
		deletePost(input: $input)
	}
`

export const FIND_POSTS_FOR_TAG_PAGE = gql`
	query Query($query: FindAllPostsQuery!) {
		posts: findAllPosts(query: $query) {
			_count {
				comments
				claps
				lists
			}
			id
			image {
				url
			}
			creator {
				id
				username
				avatar {
					url
				}
			}
			claps {
				userId
			}
			title
			public
			description
			createdAt
		}
	}
`

export const FIND_POST_CLAPS = gql`
	query FindPostClaps($input: FindPostClapsInput!) {
		claps: findPostClaps(input: $input) {
			id
			postId
			userId
		}
	}
`

export const FIND_TRENDING_POSTS = gql`
	query FindTrendingPosts($query: FindTrendingPostsQuery!) {
		posts: findTrendingPosts(query:$query) {
			id 
			creator {
				username 
				avatar {
					url 
				}
				id
			}
			public 
			createdAt 
			title 
		}
	}
`

export const FIND_POSTS = gql`
	query FindPosts($query: FindAllPostsQuery!) {
		posts: findAllPosts(query: $query) {
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
			_count {
				lists
			}
		}
	}
`

export const FIND_LIST_POSTS = gql`
	query FindListPosts($input: FindListPostsInput!) {
		posts: findListPosts(input: $input) {
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
