import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface SmallCardProps {
	title: string;
	value: string | number;
	unit?: string;
	icon?: React.ReactNode;
	color?: 'blue' | 'green' | 'orange' | 'purple' | 'default';
}

const colorClasses = {
	blue: { border: 'border-l-blue-500', icon: 'text-blue-500' },
	green: { border: 'border-l-green-500', icon: 'text-green-500' },
	orange: { border: 'border-l-orange-500', icon: 'text-orange-500' },
	purple: { border: 'border-l-purple-500', icon: 'text-purple-500' },
	default: { border: 'border-l-gray-500', icon: 'text-gray-500' },
};

export function SmallCard({
	title,
	value,
	unit,
	icon,
	color = 'default',
}: SmallCardProps) {
	const cfg = colorClasses[color];
	return (
		<Card
			className={`${cfg.border} border-l-3 justify-center p-0 h-[80px] min-w-[100px]`}
		>
			<CardContent className="p-4">
				<div className="flex items-center justify-between ">
					<div className="flex flex-col">
						<span className="text-xs font-medium text-muted-foreground">
							{title}
						</span>
						<span className="font-bold text-l">
							{value}
							{unit}
						</span>
					</div>
					<div className="text-2xl font-bold">
						{icon && <div className={`text-lg ${cfg.icon}`}>{icon}</div>}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
