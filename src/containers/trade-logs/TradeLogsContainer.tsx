import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns/format';
import { ko } from 'date-fns/locale';

import { TradeLogMonthData } from '@/@types/tradeLogs';
import { HOUR_IN_SECOND } from '@/constants/time';
import { fetchClientData } from '@/services/fetchClientData';

import AsideCard from './AsideCard';
import { CalendarContainer } from './CalendarContainer';

export default async function TradeLogsContainer() {
	const user = await currentUser();

	if (!user) {
		redirect('/auth-required');
	}

	const yearMonth = format(new Date(), 'yyyyMM', { locale: ko });

	const res = await fetchClientData<TradeLogMonthData>(
		`/trade-logs?userId=${user.id}&yearMonth=${yearMonth}`,
		{
			method: 'GET',
			next: {
				revalidate: HOUR_IN_SECOND,
			},
		}
	);

	if (!res) {
		return <div>Error</div>;
	}

	const {
		dates,
		total_buy_amount: totalBuyAmount,
		total_sell_amount: totalSellAmount,
		total_commission_and_tax: totalCommissionAndTax,
		profit_rate: profitRate,
		sentiment,
		top_buy: topBuy,
	} = res.data;

	return (
		<div className="flex w-full h-full">
			<div className="flex h-full w-full gap-4">
				<div className="flex flex-3/4 w-full h-full justify-center">
					<CalendarContainer dates={dates} />
				</div>
				<AsideCard
					totalBuyAmount={totalBuyAmount}
					totalSellAmount={totalSellAmount}
					totalCommissionAndTax={totalCommissionAndTax}
					profitRate={profitRate}
					sentiments={sentiment}
					topBuy={topBuy}
				/>
			</div>
		</div>
	);
}
