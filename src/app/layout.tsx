// import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { Base, Login, NavBar } from '@/components/layouts';
import QueryClientProvider from '@/components/providers/QueryClientProvider';
import { Toaster } from '@/components/ui/sonner';
import { DialogProvider } from '@/hooks/DialogContext';

import type { Metadata } from 'next';

import './globals.css';

// const oneShinhan = localFont({
// 	src: [
// 		{
// 			path: './fonts/ONESHINHANLIGHT_2.ttf',
// 			weight: '300', // light
// 			style: 'normal',
// 		},
// 		{
// 			path: './fonts/ONESHINHANMEDIUM_2.ttf',
// 			weight: '500', // medium (기본으로 사용할 weight)
// 			style: 'normal',
// 		},
// 		{
// 			path: './fonts/ONESHINHANBOLD_2.ttf',
// 			weight: '700', // bold
// 			style: 'normal',
// 		},
// 	],
// 	variable: '--font-one-shinhan',
// });

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
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
						{/* <body className={`${oneShinhan.className} antialiased`}> */}
						<body className={roboto.className}>
							<NavBar>
								<Login />
							</NavBar>
							<Base>{children}</Base>
							<Toaster />
						</body>
					</html>
				</DialogProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
