'use client';

import { FC, ReactNode } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import { ICON_BG_COLOR_LIST } from '@/constants/colors';

interface Props {
	value: ReactNode;
	description: string;
	icon: React.ReactNode;
	index: number;
}

const InfoCard: FC<Props> = ({ value, description, icon, index = 0 }) => {
	return (
		<Card className="w-auto h-[200px] flex flex-col items-center justify-center">
			<div
				className={`flex items-center justify-center w-[46px] h-[46px] rounded-xl ${ICON_BG_COLOR_LIST[index]}`}
			>
				{icon}
			</div>
			<CardContent className="flex flex-col items-center justify-center gap-1">
				<CardTitle className="text-heading2">{value}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardContent>
		</Card>
	);
};
export default InfoCard;
