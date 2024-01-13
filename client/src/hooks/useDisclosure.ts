import { useState,useCallback } from 'react'

type Response = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
}

export const useDisclosure = (defaultOpen:boolean = false): Response => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

	const onOpen = useCallback(() => setIsOpen(true), [])
	const onToggle = useCallback(() => setIsOpen((prev) => !prev), [])
	const onClose = useCallback(() => setIsOpen(false), [])

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle
	}
}
