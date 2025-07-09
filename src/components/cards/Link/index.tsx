import { FC, PropsWithChildren } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Props {
	title: string;
	description: string;
	icon: React.ReactNode;
	bgColor: string;
}

const LinkCard: FC<PropsWithChildren<Props>> = ({
	title,
	description,
	children,
	icon,
	bgColor,
}) => {
	return (
		<Card className="w-full h-[200px]">
			<CardHeader>
				<CardTitle className="flex items-center gap-3 text-heading2">
					<div
						className={`flex items-center justify-center w-[46px] h-[46px] rounded-xl bg-${bgColor}`}
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
