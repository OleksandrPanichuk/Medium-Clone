import { DELETE_POST } from "@/graphql"
import { useCacheManager } from "@/lib"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import {toast} from "sonner"

export const useDeletePost = (postId:string) => {
    const router = useRouter()
    const cacheManager = useCacheManager()
    return useMutation(DELETE_POST, {
        variables: {
            input: {
                postId
            }
        },
        onCompleted: () => {
            cacheManager.deletePost(postId)

            toast.success("Story successfully deleted.")
            
            router.refresh()
            router.push('/')
        },
        onError: () =>  toast.error('Failed to delete post. Please, try again later.')
    })
}