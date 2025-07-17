'use client';

import { FC } from 'react';

import { TradeLogTransaction } from '@/@types/tradeLogs';
import HelpTooltip from '@/components/custom/HelpTooltip';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';

interface Props {
	getFinanceData: (code: string) => void;
	tradeDetails: TradeLogTransaction[];
}

const TradeDetailTable: FC<Props> = ({ getFinanceData, tradeDetails }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-1">
				<h1 className="text-heading3 font-bold">거래 기록</h1>
				<HelpTooltip text="종목명을 클릭하면 재무제표를 확인할 수 있습니다." />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>종목명</TableHead>
						<TableHead>매수 평균가</TableHead>
						<TableHead>매수 수량</TableHead>
						<TableHead>매도 평균가</TableHead>
						<TableHead>매도 수량</TableHead>
						<TableHead>세금 및 수수료</TableHead>
						<TableHead>손익 금액</TableHead>
						<TableHead>수익률</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tradeDetails.map((row) => (
						<TableRow key={`${row.stock_name}-${row.stock_code}`}>
							<TableCell
								onClick={() => getFinanceData(row.stock_code)}
								className="cursor-pointer underline text-brand-shinhan-blue"
							>
								{row.stock_name}
							</TableCell>
							<TableCell>
								{row.avg_buy_price === 0 ? (
									<span className="text-muted-foreground">
										-
									</span>
								) : (
									row.avg_buy_price.toLocaleString()
								)}
							</TableCell>
							<TableCell>
								{row.buy_quantity === 0 ? (
									<span className="text-muted-foreground">
										-
									</span>
								) : (
									row.buy_quantity
								)}
							</TableCell>
							<TableCell>
								{row.avg_sell_price === 0 ? (
									<span className="text-muted-foreground">
										-
									</span>
								) : (
									row.avg_sell_price.toLocaleString()
								)}
							</TableCell>
							<TableCell>
								{row.sell_quantity === 0 ? (
									<span className="text-muted-foreground">
										-
									</span>
								) : (
									row.sell_quantity
								)}
							</TableCell>
							<TableCell>
								{row.cmsn_alm_tax === 0 ? (
									<span className="text-muted-foreground">
										-
									</span>
								) : (
									row.cmsn_alm_tax.toLocaleString()
								)}
							</TableCell>
							<TableCell
								className={
									row.profit_amount === 0
										? 'text-muted-foreground'
										: row.profit_amount > 0
											? 'text-red-500'
											: 'text-blue-500'
								}
							>
								{row.profit_amount === 0
									? '-'
									: row.profit_amount.toLocaleString()}
							</TableCell>
							<TableCell
								className={
									row.profit_rate === 0
										? 'text-muted-foreground'
										: row.profit_rate > 0
											? 'text-red-500'
											: 'text-blue-500'
								}
							>
								{row.profit_rate === 0 ? (
									'-'
								) : (
									<>
										{row.profit_rate > 0 ? '+' : ''}
										{row.profit_rate}%
									</>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TradeDetailTable;
