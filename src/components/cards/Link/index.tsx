'use client';

import { FC, PropsWithChildren, useLayoutEffect, useState } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ICON_BG_COLOR_LIST } from '@/constants/colors';

interface Props {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const LinkCard: FC<PropsWithChildren<Props>> = ({
	title,
	description,
	children,
	icon,
}) => {
	const [index, setIndex] = useState(0);

	useLayoutEffect(() => {
		setIndex(Math.floor(Math.random() * ICON_BG_COLOR_LIST.length));
	}, []);

	return (
		<Card className="w-full h-[200px]">
			<CardHeader>
				<CardTitle className="flex items-center gap-3 text-heading2">
					<div
						className={`flex items-center justify-center w-[46px] h-[46px] rounded-xl ${ICON_BG_COLOR_LIST[index]}`}
					>
						{icon}
					</div>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{description}</CardDescription>
			</CardContent>
			<CardFooter className="flex gap-2">{children}</CardFooter>
		</Card>
	);
};

export default LinkCard;
