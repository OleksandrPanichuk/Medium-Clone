'use client'
import {CURRENT_USER_QUERY, SIGN_OUT} from '@/graphql'
import { TypeCurrentUser } from '@/shared/types'
import {FetchResult, useApolloClient, useMutation, useQuery} from '@apollo/client'
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from 'react'
import {deleteSessionCookie} from "@/services";
import {useRouter} from "next/navigation";

interface IAuthContext{
	user: TypeCurrentUser | null
	setUser: Dispatch<SetStateAction<TypeCurrentUser | null>>
	isSignOut:boolean
	signOut:() => Promise<FetchResult>
}

export const AuthContext = createContext<IAuthContext>(
	{} as IAuthContext
)

interface IAuthProviderProps {
	user: TypeCurrentUser | null
}

const AuthProvider = ({
	children,
	user
}: PropsWithChildren<IAuthProviderProps>) => {
	const [currentUser, setCurrentUser] = useState<TypeCurrentUser | null>(user)
	const router = useRouter()
	const apolloClient = useApolloClient()

	const [signOut, {loading:isSignOut}] = useMutation(SIGN_OUT, {
		onCompleted: async () => {
			await deleteSessionCookie()
			await apolloClient.clearStore()
			setCurrentUser(null)
			router.refresh()
		}
	})


	useQuery<{ user: TypeCurrentUser }>(CURRENT_USER_QUERY, {
		skip: !!currentUser,
		onCompleted:(data) => {
			setCurrentUser(data.user)
		},
	})

	return (
		<AuthContext.Provider
			value={{
				user: currentUser,
				setUser: setCurrentUser,
				isSignOut,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
