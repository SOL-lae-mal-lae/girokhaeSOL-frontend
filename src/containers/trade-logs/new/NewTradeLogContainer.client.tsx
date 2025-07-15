'use client';

import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { StockWithDisplay } from '@/@types/stocks';
import { TradeLogTransaction } from '@/@types/tradeLogs';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { getAccounts } from '@/services/accounts';
import { getTransaction } from '@/services/trade-logs';

import {
	AccountSelect,
	TradeDetailTable,
	TradeLogAside,
	TradeSummary,
	StockDatePicker,
} from './_view';

interface Props {
	date: string;
}

export default function NewTradeLogContainerClient({ date }: Props) {
	const queryClient = useQueryClient();
	const [selectedAccount, setSelectedAccount] = useState<string>('');
	const [isClicked, setIsClicked] = useState(false);
	const [stockList, setStockList] = useState<StockWithDisplay[]>([]);
	const [transactionList, setTransactionList] = useState<
		TradeLogTransaction[]
	>([]);

	const { data: accounts } = useQuery({
		queryKey: ['accounts'],
		queryFn: getAccounts,
	});
	const { data: transaction, isLoading: isLoadingTransaction } = useQuery({
		queryKey: ['transaction', date, selectedAccount],
		queryFn: () => getTransaction(date, selectedAccount),
		enabled: isClicked,
	});

	const handleSelectAccount = (account: string) => {
		setSelectedAccount(account);
	};

	const handleClickGetAccount = () => {
		setIsClicked(true);
		if (isClicked) {
			queryClient.refetchQueries({
				queryKey: ['transaction', date, selectedAccount],
			});
		}
	};

	useEffect(() => {
		if (transaction?.trade_details.length) {
			setStockList(
				transaction.trade_details.map(({ stock_code, stock_name }) => {
					return {
						code: stock_code,
						name: stock_name,
						display: true,
					};
				})
			);
			setTransactionList((prev) => [
				...prev,
				...transaction.trade_details,
			]);
		}
	}, [transaction]);

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 최상단 Title & 날짜 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">매매일지 작성</h2>
				<div className="text-base text-muted-foreground">{date}</div>
			</div>
			<div className="flex flex-row gap-10 w-full mb-8">
				{/* 좌측: 거래기록, 차트, 요약, 상세 */}
				<Card className="flex-[2.2] min-w-[500px] max-w-[900px] flex flex-col gap-8">
					{/* 거래 기록 가져오기 */}
					<CardContent className="flex flex-col gap-8">
						<AccountSelect
							accounts={accounts}
							selectedAccount={selectedAccount}
							onSelectAccount={handleSelectAccount}
							onClickGetAccount={handleClickGetAccount}
						/>
						{isLoadingTransaction && (
							<div className="flex items-center justify-center h-full">
								<LoadingSpinner text="매매일지 만드는 중..." />
							</div>
						)}
						{!isLoadingTransaction && !transaction && (
							<div className="flex items-center justify-center h-full">
								<span className="text-muted-foreground">
									거래 기록이 없습니다.
								</span>
							</div>
						)}
						{transaction && (
							<>
								{/* 차트 자리 */}
								<StockDatePicker stockList={stockList} />
								{/* 거래 요약 카드 */}
								<TradeSummary
									summaries={transaction.summaries}
								/>
								{/* 상세 거래내역 테이블 */}
								<TradeDetailTable
									tradeDetail={transactionList}
								/>
							</>
						)}
					</CardContent>
				</Card>
				{/* 우측: 작성 폼 */}
				<TradeLogAside />
			</div>
		</div>
	);
}
