import {
	BanknoteArrowUp,
	EyeOff,
	HandCoins,
	ScanBarcode,
	TrendingUpDown,
} from 'lucide-react';

import { TradeLogSummary } from '@/@types/tradeLogs';
import InfoCard from '@/components/cards/Info';

interface Props {
	summaries: TradeLogSummary;
	isSensitive: boolean;
}

const TradeSummary = ({ summaries, isSensitive }: Props) => {
	const {
		total_buy_amount,
		total_sell_amount,
		total_cmsn_tax,
		settlement_amount,
	} = summaries;

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-heading3 font-bold">금일 거래 요약</h1>
			<div className="relative grid grid-cols-2 gap-4 w-full z-10">
				<InfoCard
					value={`${total_buy_amount.toLocaleString()}원`}
					description="금일 매수 금액"
					icon={<ScanBarcode className="text-brand-white" />}
					index={0}
					isCommunity={true}
				/>
				<InfoCard
					value={`${total_sell_amount.toLocaleString()}원`}
					description="금일 매도 금액"
					icon={<HandCoins className="text-brand-white" />}
					index={1}
					isCommunity={true}
				/>
				<InfoCard
					value={`${settlement_amount.toLocaleString()}원`}
					description="금일 손익금"
					icon={<TrendingUpDown className="text-brand-white" />}
					index={2}
					fontColor={settlement_amount > 0 ? 'red' : 'blue'}
					isCommunity={true}
				/>
				<InfoCard
					value={`${total_cmsn_tax.toLocaleString()}원`}
					description="금일 수수료 및 세금"
					icon={<BanknoteArrowUp className="text-brand-white" />}
					index={0}
					isCommunity={true}
				/>
				{isSensitive && (
					<div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm z-20 flex pointer-events-auto rounded-lg items-center justify-center">
						<EyeOff className="text-gray-400" width={50} height={50} />
					</div>
				)}
			</div>
		</div>
	);
};

export default TradeSummary;
