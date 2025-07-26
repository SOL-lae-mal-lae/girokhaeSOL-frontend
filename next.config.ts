import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/v1/:path*',
				destination: 'http://localhost:8000/api/v1/:path*',
			},
		];
	},
};

export default nextConfig;
