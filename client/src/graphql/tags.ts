import { gql } from '@apollo/client'

export const TAGS_QUERY = gql`
	query FindManyTags($query: FindManyTagsQuery) {
		tags: findManyTags(query: $query) {
			id
			name
			_count {
				posts
			}
		}
	}
`

export const INFINITE_TAGS_QUERY = gql`
	query FindInfiniteTags($query: FindManyTagsQuery!) {
		tags: findManyTags(query: $query) {
			id
			name
		}
	}
`

export const FIND_TAG_BY_NAME = gql`
	query FindTagById($input: FindTagByNameInput!) {
		tag: findTagByName(input: $input) {
			id
			_count {
				posts
			}
			name
		}
	}
`
