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
			// Docker 환경에서 public 폴더 이미지 접근을 위한 설정
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '',
				pathname: '/images/**',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				port: '',
				pathname: '/images/**',
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
