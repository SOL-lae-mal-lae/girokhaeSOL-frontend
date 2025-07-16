'use client';

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

const TradeDetailTable = () => {
	const { tradeDetail } = useCreateTradeLog();
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-heading3 font-bold">거래 기록</h1>
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
					{tradeDetail.map((row, i) => (
						<TableRow key={i}>
							<TableCell>{row.stock_name}</TableCell>
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
