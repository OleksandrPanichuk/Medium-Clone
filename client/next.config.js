const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

console.log(API_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'firebasestorage.googleapis.com'
			},
			{
				hostname: 'source.unsplash.com'
			},
			{
				hostname: 'lh3.googleusercontent.com'
			},
			{
				hostname: 'avatars.githubusercontent.com'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/graphql',
				destination: `${API_URL}/api/graphql`
			}
		]
	}
}

module.exports = nextConfig
