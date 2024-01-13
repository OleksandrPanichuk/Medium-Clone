'use client'
import { useEffect, useState } from 'react'
import { ConfirmModal, CreateListModal, EditProfileModal, ProModal, AuthModal } from '@/components/modals'


export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<EditProfileModal />
			<CreateListModal />
			<ConfirmModal />
			<ProModal />
			<AuthModal />
		</>
	)
}
