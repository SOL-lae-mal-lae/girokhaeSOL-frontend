import { FC } from 'react';

import {
	BanknoteArrowUp,
	HandCoins,
	ScanBarcode,
	TrendingUpDown,
} from 'lucide-react';

import { TradeLogSummary } from '@/@types/tradeLogs';
import InfoCard from '@/components/cards/Info';

interface Props {
	summaries: TradeLogSummary;
}

const TradeSummary: FC<Props> = ({ summaries }) => {
	const {
		total_buy_amount,
		total_sell_amount,
		total_cmsn_tax,
		profit_rate,
		settlement_amount,
	} = summaries;
	return (
		<div className="flex flex-col gap-2">
			<div className="grid grid-cols-2 gap-2 w-full">
				<InfoCard
					value={`${total_buy_amount.toLocaleString()}원`}
					description="금일 매수 금액"
					icon={<ScanBarcode className="text-brand-white" />}
					index={0}
				/>
				<InfoCard
					value={`${total_sell_amount.toLocaleString()}원`}
					description="금일 매도 금액"
					icon={<HandCoins className="text-brand-white" />}
					index={1}
				/>
			</div>
			<div className="grid grid-cols-3 gap-2 w-full">
				<InfoCard
					value={`${settlement_amount.toLocaleString()}원`}
					description="금일 손익금"
					icon={<TrendingUpDown className="text-brand-white" />}
					index={0}
					fontColor={settlement_amount > 0 ? 'red' : 'blue'}
				/>
				<InfoCard
					value={`${profit_rate.toFixed(2)}%`}
					description="금일 수익률"
					icon={<TrendingUpDown className="text-brand-white" />}
					index={1}
					fontColor={profit_rate > 0 ? 'red' : 'blue'}
				/>
				<InfoCard
					value={`${total_cmsn_tax.toLocaleString()}원`}
					description="금일 수수료 및 세금"
					icon={<BanknoteArrowUp className="text-brand-white" />}
					index={2}
				/>
			</div>
		</div>
	);
};

export default TradeSummary;
