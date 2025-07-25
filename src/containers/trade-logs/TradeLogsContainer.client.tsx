'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { PageSpinner } from '@/components/ui/spinner';
import { getMonthlyTradeLogs } from '@/services/trade-logs';

import AsideCard from './_view/AsideCard';
import { CalendarContainer } from './_view/CalendarContainer';

const TradeLogsContainerClient = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['monthlyTradeLogs'],
		queryFn: async () => {
			const yearMonth = format(new Date(), 'yyyyMM', { locale: ko });
			const res = await getMonthlyTradeLogs(yearMonth);

			if (!res) {
				return;
			}
			return res.data;
		},
	});

	if (isLoading) {
		return <PageSpinner text="거래 기록을 불러오는 중..." variant="shinhan" />;
	}

	return (
		<div className="flex h-full w-full gap-4 items-start">
			<div className="flex flex-3/4 w-full h-full justify-center">
				<CalendarContainer dates={data?.dates ?? []} />
			</div>
			<AsideCard
				totalBuyAmount={data?.total_buy_amount ?? 0}
				totalSellAmount={data?.total_sell_amount ?? 0}
				totalCommissionAndTax={data?.total_commission_and_tax ?? 0}
				sentiments={data?.sentiment ?? []}
				topBuy={data?.top_buy ?? []}
			/>
		</div>
	);
};

export default TradeLogsContainerClient;
