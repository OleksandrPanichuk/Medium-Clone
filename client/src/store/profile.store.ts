
import {create} from 'zustand'

interface IProfileStore  {
    isEditing: boolean
    enableEditing:() => void
    disableEditing:() => void
}

export const useProfileStore = create<IProfileStore>((set) => ({
    isEditing:false ,
    enableEditing:() => set({isEditing:true}),
    disableEditing:() => set({isEditing:false}),

}))

