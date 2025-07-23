'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import {
	Building2,
	ChartColumn,
	DollarSign,
	Percent,
	TrendingUp,
} from 'lucide-react';

import { FinancialStatementData } from '@/@types/financialStatement';
import { LargeCard } from '@/components/cards/FinanceInfo/LargeCard';
import { SmallCard } from '@/components/cards/FinanceInfo/SmallCard';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { formatCurrency, calculateOperatingMargin } from '@/lib/format';
import { getFinancialStatements } from '@/services/financial-statements';

interface Props {
	sheetOpen: boolean;
	selectedCode: string;
	stockName: string;
	onChangeSheet: (state: boolean) => void;
}

export default function FinancialContainer({
	sheetOpen,
	selectedCode,
	stockName,
	onChangeSheet,
}: Props) {
	// 재무제표 sheet에 필요한 거
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

	return (
		<>
			{/* 재무제표 띄우기 */}
			<Sheet open={sheetOpen} onOpenChange={onChangeSheet}>
				<SheetContent className="!w-[30vw] flex flex-col !max-w-none pl-3 pr-3">
					<SheetHeader aria-description="financial-statement">
						<SheetTitle>
							{`재무제표 - ${stockName}(${selectedCode})`}
						</SheetTitle>
						{/* <SheetDescription></SheetDescription> */}
					</SheetHeader>
					{statements ? (
						<div className="">
							{/* pbr, per, 부채비율, EPS */}
							<div className="grid grid-flow-row gap-4 grid-cols-2 ">
								<SmallCard
									title="PBR"
									value={
										statements.pbr ? statements.pbr : '-'
									}
									color="blue"
									icon={<TrendingUp />}
									unit=""
								/>
								<SmallCard
									title="PER"
									value={
										statements.per ? statements.per : '-'
									}
									color="green"
									icon={<ChartColumn />}
									unit=""
								/>
								<SmallCard
									title="ROE"
									value={
										statements.roe ? statements.roe : '-'
									}
									color="orange"
									icon={<Percent />}
									unit="%"
								/>
								<SmallCard
									title="EPS"
									value={
										statements.eps ? statements.eps : '-'
									}
									color="purple"
									icon={<DollarSign />}
									unit="원"
								/>
								<SmallCard
									title="시가총액"
									value={
										statements.mac
											? formatCurrency(statements.mac)
											: '-'
									}
									color="default"
									icon={<Building2 />}
									unit=""
								/>
							</div>
							<div className="flex flex-col">
								<LargeCard
									title="매출"
									value={formatCurrency(statements.sale_amt)}
									icon={<DollarSign size={15} />}
									subtitle="연간 매출액"
									color="green"
								/>
								<LargeCard
									title="영업이익"
									value={formatCurrency(statements.bus_pro)}
									icon={<TrendingUp size={15} />}
									subtitle="영업 이익률"
									color="blue"
									subValue={`${calculateOperatingMargin(
										statements.sale_amt,
										statements.bus_pro
									)}`}
								/>
								<LargeCard
									title="순이익"
									value={formatCurrency(statements.cup_nga)}
									icon={<ChartColumn size={15} />}
									subtitle="순이익률"
									color="purple"
									subValue={`${calculateOperatingMargin(
										statements.sale_amt,
										statements.cup_nga
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
		</>
	);
}
