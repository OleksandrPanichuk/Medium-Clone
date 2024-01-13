import { TypeAvatar, TypeFile } from '@/shared/types'
export type TypeBaseUser = {
	id:string 
	username:string 
	avatar?: TypeAvatar
	about?:string
}
export type TypeUser = TypeBaseUser &  {
	email: string
	createdAt: string
}


export type TypeCurrentUser  = TypeUser & {
	subscribed:boolean
	verified:boolean
}

export type TypeUpdateAvatarResponse = {
	avatar: TypeFile
}