'use client';

import { FC } from 'react';

import { StockWithDisplay } from '@/@types/stocks';
import StockDayPickerCard from '@/components/cards/StockDayPicker';
import HelpTooltip from '@/components/custom/HelpTooltip';

interface Props {
	stockList: StockWithDisplay[];
}

const StockDatePicker: FC<Props> = ({ stockList }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-1">
				<h1 className="text-heading3 font-bold">거래 기록 날짜 선택</h1>
				<HelpTooltip text="시작일을 선택하면 매매일지에 차트가 생성됩니다." />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{stockList
					.filter((stock) => stock.display)
					.map((stock) => (
						<StockDayPickerCard
							key={stock.code}
							code={stock.code}
							name={stock.name}
						/>
					))}
			</div>
		</div>
	);
};

export default StockDatePicker;
