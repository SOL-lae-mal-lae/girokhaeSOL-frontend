import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LargeCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	subValue?: string;
	icon?: React.ReactNode;
	color?: 'blue' | 'green' | 'purple' | 'default';
}

const colorClasses = {
	blue: {
		border: 'border-l-4 border-l-blue-600',
		text: 'text-blue-600',
		icon: 'text-blue-600',
		back: 'bg-blue-50',
	},
	green: {
		border: 'border-l-4 border-l-green-600',
		text: 'text-green-600',
		icon: 'text-green-600',
		back: 'bg-green-50',
	},
	purple: {
		border: 'border-l-4 border-l-purple-600',
		text: 'text-purple-600',
		icon: 'text-purple-600',
		back: 'bg-purple-50',
	},
	default: {
		border: 'border-l-4 border-l-gray-300',
		text: 'text-gray-600',
		icon: 'text-gray-600',
		back: 'bg-gray-50',
	},
};

export function LargeCard({
	title,
	value,
	subtitle,
	subValue,
	icon,
	color = 'default',
}: LargeCardProps) {
	const cfg = colorClasses[color];

	return (
		<Card
			className="
        border border-gray-200
        w-full
        flex flex-col
        mt-4
        gap-0"
		>
			<CardHeader>
				<div className="flex gap-1 items-center">
					<div className={`items-center ${cfg.icon}`}>{icon}</div>
					<h3 className={`text-base font-medium`}>{title}</h3>
				</div>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col items-center justify-center text-center ">
				<div className={`text-xl font-bold ${cfg.text}`}>{value}</div>
				<div
					className={`mt-1 px-3 py-1 ${cfg.back} ${cfg.text} border border-gray-200 text-xs font-medium rounded-full`}
				>
					{subtitle} {subValue}
				</div>
			</CardContent>
		</Card>
	);
}
