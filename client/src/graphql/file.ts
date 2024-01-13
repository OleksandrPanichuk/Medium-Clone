import {gql} from '@apollo/client'


export const UPLOAD_FILE = gql`
    mutation UploadFile($file:Upload!) {
        file:uploadFile(file:$file) {
            url
            key
        }
    }
`


export const DELETE_FILE = gql`
    mutation DeleteFile($key:String!) {
        message:deleteFile(key:$key)
    }
`