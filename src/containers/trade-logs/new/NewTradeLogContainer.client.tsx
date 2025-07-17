'use client';

import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';
import { getAccounts } from '@/services/accounts';
import { getTransaction } from '@/services/trade-logs';

import {
	AccountSelect,
	TradeDetailTable,
	TradeLogAside,
	TradeSummary,
	StockDatePicker,
	FinancialContainer,
} from './_view';
import NoReport from './_view/NoReport.client';

const NewTradeLogContainerClient = () => {
	const {
		date,
		onAddTradeDetail,
		onSetTodayTradeCompanyList,
		onSetSummaries,
	} = useCreateTradeLog();
	const queryClient = useQueryClient();
	const [selectedAccount, setSelectedAccount] = useState<number>(0);
	const [isClicked, setIsClicked] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [selectedCode, setSelectedCode] = useState('');

	const { data: accounts } = useQuery({
		queryKey: ['accounts'],
		queryFn: getAccounts,
	});

	const {
		data: transaction,
		isLoading: isLoadingTransaction,
		isSuccess,
	} = useQuery({
		queryKey: ['transaction', date, selectedAccount],
		queryFn: () => getTransaction(date, selectedAccount),
		select: (data) => {
			if (!data) {
				return null;
			}
			return {
				...data,
				trade_details: data.trade_details.map((trade) => ({
					...trade,
					account_id: selectedAccount,
				})),
			};
		},
		enabled: isClicked,
	});

	const handleSelectAccount = (account: string) => {
		setSelectedAccount(Number(account));
	};

	const handleClickGetAccount = () => {
		if (isClicked) {
			queryClient.refetchQueries({
				queryKey: ['transaction', date, selectedAccount],
			});
			return;
		}
		setIsClicked(true);
	};

	const handleChangeSheetOpen = (status: boolean) => {
		setSheetOpen(status);
	};

	const getFinanceData = (code: string) => {
		setSelectedCode(code);
		handleChangeSheetOpen(true);
	};

	useEffect(() => {
		if (isSuccess && transaction) {
			onSetTodayTradeCompanyList(
				transaction.trade_details.map(({ stock_code, stock_name }) => {
					return {
						code: stock_code,
						name: stock_name,
					};
				})
			);
			onSetSummaries(transaction.summaries);
			onAddTradeDetail(transaction.trade_details);
			setIsClicked(false);
		}
	}, [isSuccess, transaction]);

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
						{!isLoadingTransaction && !transaction && <NoReport />}
						{transaction &&
							transaction.trade_details.length === 0 && (
								<NoReport />
							)}
						{transaction &&
							transaction.trade_details.length > 0 && (
								<>
									{/* 차트 자리 */}
									<StockDatePicker
										selectedAccount={selectedAccount}
									/>
									{/* 거래 요약 카드 */}
									<TradeSummary />
									{/* 상세 거래내역 테이블 */}
									<TradeDetailTable
										selectedAccount={selectedAccount}
										getFinanceData={getFinanceData}
									/>
								</>
							)}
					</CardContent>
				</Card>
				{/* 우측: 작성 폼 */}
				<TradeLogAside />
			</div>
			<FinancialContainer
				sheetOpen={sheetOpen}
				selectedCode={selectedCode}
				onChangeSheet={handleChangeSheetOpen}
			/>
		</div>
	);
};

export default NewTradeLogContainerClient;
