import {gql} from '@apollo/client'


export const CREATE_POST_COMMENT = gql`
    mutation CreatePostComment($input: CreatePostCommentInput!) {
        comment:createPostComment(input: $input) {
            claps
            content
            createdAt
            creatorId
            id
            postId
        }
    }
`

export const DELETE_POST_COMMENT = gql`
    mutation DeletePostComment($input: DeletePostCommentInput!) {
        comment:deletePostComment(input: $input) {
            claps
            content
            createdAt
            creatorId
            id
            postId
        }
}
`


export const FIND_MANY_POST_COMMENTS = gql`
    query FindAllPostComments($query: FindAllPostCommentsQuery!) {
        comments:findAllPostComments(query: $query) {
            content
            claps
            createdAt
            creatorId
            id
            postId
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

export const UPDATE_POST_COMMENT_CLAPS = gql`
    mutation UpdatePostCommentClaps($input:UpdatePostCommentClapsInput!) {
        comment:updatePostCommentClaps(input:$input) {
            id 
            claps
        }
    }
`