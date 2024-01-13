import { create } from 'zustand'
import { Modals } from '@/shared/constants'

type ModalType = Modals
type TypeModalData = {
	onSubmit?: (data?: any) => void
}

interface IModalStore {
	type: ModalType | null
	isOpen: boolean
	onOpen: (type: ModalType, data?: TypeModalData) => void
	onClose: () => void
	data?: TypeModalData
}

export const useModalStore = create<IModalStore>((set) => ({
	type: null,
	isOpen: false,
	onOpen: (type, data) => set({ isOpen: true, type, data }),
	onClose: () => set({ isOpen: false, type: null, data: undefined })
}))
