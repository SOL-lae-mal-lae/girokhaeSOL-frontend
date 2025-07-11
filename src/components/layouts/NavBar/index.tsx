'use client';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEM_HEIGHT, NAV_ITEMS } from '@/constants/nav';

interface NavBarProps {
	children: React.ReactNode;
}

export const NavBar: FC<NavBarProps> = ({ children }: NavBarProps) => {
	const pathname = usePathname();

	return (
		<header className="fixed top-0 left-0 flex w-full justify-between items-center pr-4 pl-4 gap-4 h-14 bg-brand-white shadow-md z-50">
			<div className="flex items-center gap-12 h-full">
				<Link href="/">
					<Image
						src="/images/girokhaeSOL_transparent.png"
						alt="기록해SOL"
						width={NAV_ITEM_HEIGHT}
						height={NAV_ITEM_HEIGHT}
						priority
					/>
				</Link>
				<menu className="flex items-center gap-8 relative h-full text-body1">
					{NAV_ITEMS.map((item) => (
						<li
							key={item.href}
							className="relative h-full flex items-center"
						>
							<Link
								href={item.href}
								className="block py-2 px-1 transition-colors duration-200 hover:text-brand-shinhan-blue"
							>
								{item.label}
							</Link>
							{pathname === item.href && (
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-shinhan-blue animate-slide-in" />
							)}
						</li>
					))}
				</menu>
			</div>
			{children}
		</header>
	);
};
