import { FC } from 'react';

import DatePicker from '@/components/custom/DatePicker';

interface Props {
	code: string;
	name: string;
}

const StockDayPickerCard: FC<Props> = ({ code, name }) => {
	return (
		<div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between mb-3">
				<span className="font-semibold">{name}</span>
				<span className="text-xs text-gray-500">{code}</span>
			</div>
			<DatePicker id={code} label="시작일 선택" />
		</div>
	);
};

export default StockDayPickerCard;
