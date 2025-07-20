'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { getTradeLogByDate } from '@/services/trade-logs';

import {
	TradeDetailTable,
	TradeSummary,
	TradeLogDetailAside,
	FinancialContainer,
} from './_view';
import StockChart from './_view/StockChart.client';

interface Props {
	date: string;
}

const TradeLogDetailContainerClient = ({ date }: Props) => {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [selectedCode, setSelectedCode] = useState('');

	const { data: tradeLog, isLoading: isLoadingTradeLog } = useQuery({
		queryKey: ['tradeLog', 'detail', date],
		queryFn: () => getTradeLogByDate(date),
	});

	const handleChangeSheetOpen = (status: boolean) => {
		setSheetOpen(status);
	};

	const getFinanceData = (code: string) => {
		setSelectedCode(code);
		handleChangeSheetOpen(true);
	};

	if (isLoadingTradeLog) {
		return (
			<div className="flex items-center justify-center h-full">
				<LoadingSpinner text="매매일지를 불러오는 중..." />
			</div>
		);
	}

	if (!tradeLog) {
		return (
			<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
				<div className="flex flex-col gap-1 mb-2">
					<h2 className="text-2xl font-bold">매매일지 상세</h2>
					<div className="text-base text-muted-foreground">
						{date}
					</div>
				</div>
				<div className="flex items-center justify-center h-full p-8">
					<p className="text-muted-foreground">
						해당 날짜의 매매일지가 없습니다.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 최상단 Title & 날짜 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">매매일지 상세</h2>
				<div className="text-base text-muted-foreground">{date}</div>
			</div>

			<div className="flex flex-row gap-10 w-full mb-8 items-start">
				{/* 좌측: 차트, 요약, 상세 */}
				<Card className="flex-[2.2] min-w-[500px] max-w-[900px] flex flex-col gap-8">
					<CardContent className="flex flex-col gap-8">
						{/* 차트 자리 - 사용자가 직접 구현할 예정 */}

						<StockChart stockChartList={tradeLog.charts} />

						{/* 거래 요약 카드 */}
						<TradeSummary summaries={tradeLog.summaries} />

						{/* 상세 거래내역 테이블 */}
						<TradeDetailTable
							getFinanceData={getFinanceData}
							tradeDetails={tradeLog.trade_details}
						/>
					</CardContent>
				</Card>

				{/* 우측: 매매일지 작성 내용 */}
				<TradeLogDetailAside tradeLog={tradeLog} />
			</div>

			<FinancialContainer
				sheetOpen={sheetOpen}
				selectedCode={selectedCode}
				onChangeSheet={handleChangeSheetOpen}
			/>
		</div>
	);
};

export default TradeLogDetailContainerClient;
