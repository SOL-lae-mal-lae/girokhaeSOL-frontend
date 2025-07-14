import localFont from 'next/font/local';

import { ClerkProvider } from '@clerk/nextjs';

import { Base, Login, NavBar } from '@/components/layouts';
import QueryClientProvider from '@/components/providers/QueryClientProvider';
import { DialogProvider } from '@/hooks/DialogContext';

import type { Metadata } from 'next';

import './globals.css';

const oneShinhan = localFont({
	src: [
		{
			path: './fonts/ONESHINHANLIGHT_2.ttf',
			weight: '300', // light
			style: 'normal',
		},
		{
			path: './fonts/ONESHINHANMEDIUM_2.ttf',
			weight: '500', // medium (기본으로 사용할 weight)
			style: 'normal',
		},
		{
			path: './fonts/ONESHINHANBOLD_2.ttf',
			weight: '700', // bold
			style: 'normal',
		},
	],
	variable: '--font-one-shinhan',
});

export const metadata: Metadata = {
	title: '기록해SOL',
	description: '매매일지 작성하고 부자되자!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<QueryClientProvider>
				<DialogProvider>
					<html lang="en">
						<body className={`${oneShinhan.className} antialiased`}>
							<NavBar>
								<Login />
							</NavBar>
							<Base>{children}</Base>
						</body>
					</html>
				</DialogProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
