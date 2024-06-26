/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.rawg.io',
				port: '',
				pathname: '/media/**',
			},
		],
	},
	// images: {
	// 	domains: ['media.rawg.io'],
	// },
};

export default nextConfig;
