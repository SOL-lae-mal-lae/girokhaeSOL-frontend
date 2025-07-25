'use client';

import * as React from 'react';
import { FC, useState } from 'react';

import { format, subMonths } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

import MiniCustomDayButton from './MiniDayButton';

interface Props {
	id: string;
	label: string;
}

const DatePicker: FC<Props> = ({ id, label }) => {
	const { stockDateRange, onChangeDate } = useCreateTradeLog();
	const [open, setOpen] = useState(false);

	// 6개월 전 날짜를 기본값으로 설정
	const defaultDate = subMonths(new Date(), 6);

	const date = stockDateRange[id]?.start_date
		? new Date(stockDateRange[id]?.start_date)
		: defaultDate;

	return (
		<div className="flex justify-between items-center">
			<Label htmlFor={id} className="px-1 cursor-pointer">
				{label}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id={id}
						className="justify-between font-normal cursor-pointer"
					>
						{date ? format(date, 'yyyy-MM-dd') : '날짜 선택'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							setOpen(false);
							if (date) {
								onChangeDate(id, date);
							}
						}}
						components={{
							DayButton: (props) => <MiniCustomDayButton {...props} />,
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DatePicker;
