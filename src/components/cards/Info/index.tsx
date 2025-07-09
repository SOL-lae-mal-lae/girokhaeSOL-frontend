import { FC } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

interface Props {
	value: string;
	description: string;
	bgColor: string;
	icon: React.ReactNode;
}

const InfoCard: FC<Props> = ({ value, description, icon, bgColor }) => {
	return (
		<Card className="w-auto h-[200px] flex flex-col items-center justify-center">
			<div
				className={`flex items-center justify-center w-[46px] h-[46px] rounded-xl bg-${bgColor}`}
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
