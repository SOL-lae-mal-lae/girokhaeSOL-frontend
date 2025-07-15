'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns/format';

import CustomDayButton from '@/components/custom/DayButton';
import { Calendar } from '@/components/ui/calendar';

interface Props {
	dates: string[];
}

export const CalendarContainer: FC<Props> = ({ dates }) => {
	const router = useRouter();
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
					router.push(`/trade-logs/${dateString}`);
				} else {
					router.push(`/trade-logs/new?date=${dateString}`);
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
