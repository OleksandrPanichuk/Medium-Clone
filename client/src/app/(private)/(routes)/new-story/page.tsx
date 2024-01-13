import { NewStoryPage } from "@/components/screens/new-story"
import { constructMetadata } from "@/shared/metadata/new-story"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata()

const Page = () => {
	return (
		<NewStoryPage />
	)
}

export default Page
