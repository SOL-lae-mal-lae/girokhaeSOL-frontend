'use client';

import * as React from 'react';
import { FC, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

interface Props {
	id: string;
	label: string;
}

const DatePicker: FC<Props> = ({ id, label }) => {
	const { stockDateRange, onChangeDate } = useCreateTradeLog();
	const [open, setOpen] = useState(false);

	const date = stockDateRange[id]?.start_date
		? new Date(stockDateRange[id]?.start_date)
		: undefined;

	return (
		<div className="flex gap-3 items-center">
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
						{date ? date.toLocaleDateString() : '날짜 선택'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
				>
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
							DayButton: (props) => (
								<CalendarDayButton
									{...props}
									className="cursor-pointer"
								/>
							),
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DatePicker;
