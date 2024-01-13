"use client"

import { useDisclosure } from "@/hooks";
import { Editor, EditorProvider, Header, PublishForm } from "@/components/screens/new-story";


export const NewStoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<EditorProvider>
			<Header onModalOpen={onOpen} />
			<Editor />
			<PublishForm isOpen={isOpen} onClose={onClose} />
		</EditorProvider>
	)
};
