import { TypeAvatar } from "."


export type TypePostComment = {
    content:string
    claps:number
    createdAt:Date
    creatorId:string
    id:string
    postId:string
}
export type TypePostCommentWithCreator = TypePostComment & {
    creator: {
        avatar?: TypeAvatar
        username:string 
        id:string
    }
}
export type TypeCreatePostCommentResponse = {
    comment:TypePostComment
}
