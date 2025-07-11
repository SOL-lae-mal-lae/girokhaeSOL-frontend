'use client';

import { FC } from 'react';
import * as React from 'react';

import { redirect } from 'next/navigation';

import { format } from 'date-fns/format';

import CustomDayButton from '@/components/custom/DayButton';
import { Calendar } from '@/components/ui/calendar';

interface Props {
	dates: string[];
}

export const CalendarContainer: FC<Props> = ({ dates }) => {
	return (
		<Calendar
			className="min-w-3/4 min-h-2/3 mt-8"
			captionLayout="dropdown-years"
			onDayClick={(day) => {
				const dateString = format(day, 'yyyy-MM-dd');
				const isFuture = day.getDate() > new Date().getDate();
				const hasTradeLog = dates.includes(dateString);
				if (isFuture) {
					return;
				}
				if (hasTradeLog) {
					redirect(`/trade-logs/${dateString}`);
				} else {
					redirect(`/trade-logs/new?date=${dateString}`);
				}
			}}
			components={{
				DayButton: (props) => (
					<CustomDayButton {...props} dates={dates} />
				),
			}}
		/>
	);
};
