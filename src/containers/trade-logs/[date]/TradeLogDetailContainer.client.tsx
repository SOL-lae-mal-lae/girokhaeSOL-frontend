'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AIEvaluationResult } from '@/@types/ai';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { getAiEvaluation, getTradeLogByDate } from '@/services/trade-logs';

import { TradeDetailTable, TradeSummary, TradeLogDetailAside } from './_view';
import StockChart from './_view/StockChart.client';
import FinancialContainer from '../_view/FinancialContainer.client';
import AIEvaluation from './_view/AIEvaluation';
interface Props {
	date: string;
}

const TradeLogDetailContainerClient = ({ date }: Props) => {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [selectedCode, setSelectedCode] = useState('');
	const [stockName, setStockName] = useState('');
	const [aiSheetOpen, setAiSheetOpen] = useState(false);
	const [aiResult, setAiResult] = useState<AIEvaluationResult | null>(null);

	const handleChangeAiSheetOpen = (status: boolean) => {
		setAiSheetOpen(status);
	};

	const { data: tradeLog, isLoading: isLoadingTradeLog } = useQuery({
		queryKey: ['tradeLog', 'detail', date],
		queryFn: () => getTradeLogByDate(date),
	});

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['ai-evaluation', date],
		queryFn: () => getAiEvaluation(date),
		enabled: false,
	});

	const handleChangeSheetOpen = (status: boolean) => {
		setSheetOpen(status);
	};

	const getFinanceData = (code: string, name: string) => {
		setSelectedCode(code);
		setStockName(name);
		handleChangeSheetOpen(true);
	};

	const fetchAiEvaluation = () => {
		refetch();
	};

	useEffect(() => {
		if (tradeLog?.ai_result) {
			setAiResult(tradeLog.ai_result);
		}
	}, [tradeLog?.ai_result]);

	useEffect(() => {
		if (isSuccess) {
			toast.success('AI 평가가 완료되었습니다.');
			setAiResult(data);
			handleChangeAiSheetOpen(true);
		}
	}, [isSuccess]);

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
				<TradeLogDetailAside
					tradeLog={tradeLog}
					onChangeAiSheetOpen={handleChangeAiSheetOpen}
					fetchAiEvaluation={fetchAiEvaluation}
					isLoading={isLoading}
					hasResult={!!data}
				/>
			</div>
			<FinancialContainer
				sheetOpen={sheetOpen}
				selectedCode={selectedCode}
				onChangeSheet={handleChangeSheetOpen}
				stockName={stockName}
			/>
			{aiResult && (
				<AIEvaluation
					result={aiResult}
					isOpen={aiSheetOpen}
					onChangeOpen={handleChangeAiSheetOpen}
				/>
			)}
		</div>
	);
};

export default TradeLogDetailContainerClient;
