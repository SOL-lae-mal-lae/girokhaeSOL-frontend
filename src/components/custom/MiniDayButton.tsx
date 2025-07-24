'use client';

import { useEffect, useRef } from 'react';

import { DayButton, getDefaultClassNames } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MiniCustomDayButton = ({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) => {
	const { onClick, ...restProps } = props;
	const defaultClassNames = getDefaultClassNames();

	const ref = useRef<HTMLButtonElement>(null);

	// 오늘 이후 날짜는 비활성화
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const isFuture = day.date > today;
	const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
	// 오늘 날짜 판별
	const isToday = day.date.getTime() === today.getTime();

	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			disabled={isFuture || isWeekend}
			className={cn(
				'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70 relative',
				defaultClassNames.day,
				className,
				(isFuture || isWeekend) &&
					'bg-gray-100/90 pointer-events-none select-none cursor-default hover:bg-gray-100/90 focus:bg-gray-100/90 focus:ring-0',
				isToday &&
					!isFuture &&
					'box-border bg-brand-white border-3 border-brand-shinhan-blue hover:bg-brand-shinhan-blue hover:text-brand-white focus:bg-brand-shinhan-blue focus:text-brand-white',
				!isFuture && 'cursor-pointer'
			)}
			{...(isFuture ? {} : { onClick })}
			{...restProps}
		>
			{day.date.getDate()}
		</Button>
	);
};

export default MiniCustomDayButton;
