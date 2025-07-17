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

const TradeSummary = ({ summaries }: Props) => {
	const {
		total_buy_amount,
		total_sell_amount,
		total_cmsn_tax,
		settlement_amount,
	} = summaries;

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-heading3 font-bold">금일 거래 요약</h1>
			<div className="grid grid-cols-2 gap-4 w-full">
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
				<InfoCard
					value={`${settlement_amount.toLocaleString()}원`}
					description="금일 손익금"
					icon={<TrendingUpDown className="text-brand-white" />}
					index={2}
					fontColor={settlement_amount > 0 ? 'red' : 'blue'}
				/>
				<InfoCard
					value={`${total_cmsn_tax.toLocaleString()}원`}
					description="금일 수수료 및 세금"
					icon={<BanknoteArrowUp className="text-brand-white" />}
					index={0}
				/>
			</div>
		</div>
	);
};

export default TradeSummary;
