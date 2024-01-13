import { gql } from '@apollo/client'

export const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		user: signIn(input: { email: $email, password: $password }) {
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

export const SIGN_UP = gql`
	mutation SignUp($email: String!, $password: String!, $username: String!) {
		user: signUp(
			input: { username: $username, email: $email, password: $password }
		) {
			email
            id
            username 
            createdAt 
            avatar {
                url 
                key
            }
            about
            verified
		}
	}
`

export const SIGN_OUT = gql`
	mutation SignOut {
		signOut
	}
`


export const SEND_VERIFY_EMAIL_LINK = gql`
    mutation SendVerifyEmailLink($input:SendVerificationLinkInput!) {
        result:sendVerificationLink(input:$input)
    }
`

export const VERIFY_EMAIL  = gql`
    query VerifyEmail($input:VerifyEmailInput!) {
        user:verifyEmail(input:$input) {
            verified
        }
    }
`



export const SEND_RESET_PASSWORD_LINK = gql`
    mutation SendResetPasswordLink($input: SendResetPasswordLinkInput!) {
        result:sendResetPasswordLink(input: $input)
    }
`

export const VERIFY_RESET_PASSWORD_CODE = gql`
    query VerifyResetPasswordCode($code:String!) {
        verified:verifyResetPasswordCode(code:$code)
    }
`   


export const RESET_PASSWORD = gql`
    mutation ResetPassword($input:ResetPasswordInput!) {
        resetPassword(input:$input) 
    }
`