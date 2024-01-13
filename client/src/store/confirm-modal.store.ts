import { defaultConfirmModalDescription, defaultConfirmModalTitle } from '@/shared/constants'
import {create } from 'zustand'


type TypeOnOpenProps = {
    title?:string 
    description?:string 
    onConfirm?:() => void
}
interface ICreateModalStore {
    isOpen: boolean
    onOpen:({title, description, onConfirm}:TypeOnOpenProps) => void
    onClose:() => void
    title:string
    description:string
    onConfirm?: () => void
}




export const useConfirmModal = create<ICreateModalStore>(set =>({
    isOpen:false,
    onOpen:({description, title, onConfirm}) => set({isOpen:true, title:title ?? defaultConfirmModalTitle, description:description ?? defaultConfirmModalDescription, onConfirm}),
    onClose:() => set({isOpen:false, title:defaultConfirmModalTitle, description:defaultConfirmModalDescription, onConfirm:undefined}),
    title:defaultConfirmModalTitle,
    description:defaultConfirmModalDescription,
    onConfirm:undefined
}))