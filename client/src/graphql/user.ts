import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
    query CurrentUser {
        user:currentUser {
            email
            id
            username 
            createdAt 
            avatar {
                url 
                key
            }
            subscribed
            about
            verified
        }
    }
`


export const FIND_USER_BY_ID = gql`
    query FindUserByIdQuery($input: FindUserByIdInput!) {
        user:findUserById(input:$input) {
            about
            avatar {
                url 
            }
            id 
            username
        }
    }
`


export const FIND_USERS = gql`
    query FindUsersQuery($query:SearchUsersQuery!) {
        users:searchUsers(query:$query) {
            about
            avatar {
                url 
            }
            id 
            username
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($input:UpdateUserInput!) {
        user:updateUser(input:$input) {
            about
            avatar {
                url
                key
            }
            createdAt
            email
            id
            username
        }
    }
`


export const UPDATE_USER_AVATAR = gql`
    mutation UpdateUserAvatar($file:Upload!) {
        user:updateUserAvatar(file:$file) {
            avatar {
                key
                url
            }
        }
    }
`


export const SUBSCRIBE_OR_MANAGE = gql`
    mutation GetSubscribeOrManageLink($input:SubscribeInput!) {
        url:subscribeOrManage(input:$input)
    }
`

export const GET_USER_POSTS_COUNT = gql`
    query GetUserPostsCount {
        posts:getUserPostsCount
    }
`