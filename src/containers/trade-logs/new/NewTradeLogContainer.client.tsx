'use client';

import { useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { getAccounts } from '@/services/accounts';
import { getTransaction } from '@/services/trade-logs';

import AccountSelect from './_view/AccountSelect.client';
import TradeDetailTable from './_view/TradeDetailTable.client';
import TradeLogAside from './_view/TradeLogAside.client';
import TradeSummary from './_view/TradeSummary.client';

interface Props {
	date: string;
}

export default function NewTradeLogContainerClient({ date }: Props) {
	const queryClient = useQueryClient();
	const [selectedAccount, setSelectedAccount] = useState<string>('');
	const [isClicked, setIsClicked] = useState(false);

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

	// 재무제표 sheet에 필요한 거
	const [sheetOpen, setSheetOpen] = useState(false);
	const [selectedCode, setSelectedCode] = useState('');
	const [statements, setStatements] = useState<FinancialStatementData | null>(
		null
	);

	// 종목 코드 눌렀을 때, 나올 재무제표 데이터
	useEffect(() => {
		if (sheetOpen && selectedCode) {
			(async () => {
				const data = await getFinancialStatements(selectedCode);
				setStatements(data); // 받아온 데이터 저장
			})();
		} else {
			setStatements(null); // Sheet 닫힐 때 데이터 초기화
		}
	}, [sheetOpen, selectedCode]);

	async function getFinanceData(code: string) {
		setSelectedCode(code);
		setSheetOpen(true);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 최상단 Title & 날짜 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">매매일지 작성</h2>
				<div className="text-base text-muted-foreground">{date}</div>
			</div>
			<div className="flex flex-row gap-10 w-full mb-8">
				{/* 좌측: 거래기록, 차트, 요약, 상세 */}
				<div className="flex-[2.2] min-w-[500px] max-w-[900px] flex flex-col gap-8">
					{/* 거래 기록 가져오기 */}
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
							<Card className="h-64 flex items-center justify-center">
								<span className="text-muted-foreground">
									[차트 자리 - 차트 UI 확정 후 구현]
								</span>
							</Card>
							{/* 거래 요약 카드 */}
							<TradeSummary summaries={transaction.summaries} />
							{/* 상세 거래내역 테이블 */}
							<TradeDetailTable
								tradeDetail={transaction.trade_details}
							/>
						</>
					)}
				</div>
				{/* 재무제표 띄우기 */}
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetContent
						className="!w-[30vw] flex flex-col !max-w-none pl-3 pr-3"
						aria-describedby={undefined}
					>
						<SheetHeader>
							<SheetTitle>
								{statements
									? `재무제표 - ${
											statements.stock_code || '코드 없음'
										}`
									: '재무제표 정보 없음'}
							</SheetTitle>
						</SheetHeader>
						{statements ? (
							<div className="">
								{/* pbr, per, 부채비율, EPS */}
								<div className="grid grid-flow-row gap-4 grid-cols-2 ">
									<SmallCard
										title="PBR"
										value={
											statements.pbr
												? statements.pbr
												: '-'
										}
										color="blue"
										icon={<TrendingUp />}
										unit=""
									/>
									<SmallCard
										title="PER"
										value={
											statements.per
												? statements.per
												: '-'
										}
										color="green"
										icon={<ChartColumn />}
										unit=""
									/>
									<SmallCard
										title="부채비율"
										value={
											statements.debt_ratio
												? statements.debt_ratio
												: '-'
										}
										color="orange"
										icon={<Percent />}
										unit="%"
									/>
									<SmallCard
										title="EPS"
										value={
											statements.eps
												? statements.eps
												: '-'
										}
										color="purple"
										icon={<DollarSign />}
										unit="원"
									/>
								</div>
								<div className="flex flex-col">
									<LargeCard
										title="매출"
										value={formatCurrency(
											statements.revenue
										)}
										icon={<DollarSign size={15} />}
										subtitle="연간 매출액"
										color="green"
									/>
									<LargeCard
										title="영업이익"
										value={formatCurrency(
											statements.operating_income
										)}
										icon={<TrendingUp size={15} />}
										subtitle="영업 이익률"
										color="blue"
										subValue={`${calculateOperatingMargin(
											statements.revenue,
											statements.operating_income
										)}`}
									/>
									<LargeCard
										title="순이익"
										value={formatCurrency(
											statements.net_income
										)}
										icon={<ChartColumn size={15} />}
										subtitle="순이익률"
										color="purple"
										subValue={`${calculateOperatingMargin(
											statements.revenue,
											statements.net_income
										)}`}
									/>
								</div>
							</div>
						) : (
							// 재무제표 데이터 없을 때
							<div className="flex flex-col items-center justify-center h-full w-full">
								<Image
									src="/images/SOL_search.png"
									alt="sol_search"
									width={200}
									height={200}
								/>
								<span>데이터가 존재하지 않습니다</span>
							</div>
						)}
					</SheetContent>
				</Sheet>

				{/* 우측: 작성 폼 */}
				<TradeLogAside />
			</div>
		</div>
	);
}
