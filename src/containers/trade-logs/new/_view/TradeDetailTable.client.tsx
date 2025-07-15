'use client';

import { FC } from 'react';

import { TradeLogTransaction } from '@/@types/tradeLogs';
import { Card, CardContent } from '@/components/ui/card';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';

interface Props {
	tradeDetail: TradeLogTransaction[];
}

const TradeDetailTable: FC<Props> = ({ tradeDetail }) => {
	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>종목코드</TableHead>
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
								<TableCell>{row.stock_code}</TableCell>
								<TableCell>{row.stock_name}</TableCell>
								<TableCell>
									{row.avg_buy_price.toLocaleString()}
								</TableCell>
								<TableCell>{row.buy_quantity}</TableCell>
								<TableCell>
									{row.avg_sell_price.toLocaleString()}
								</TableCell>
								<TableCell>{row.sell_quantity}</TableCell>
								<TableCell>
									{row.cmsn_alm_tax.toLocaleString()}
								</TableCell>
								<TableCell
									className={
										row.profit_amount > 0
											? 'text-red-500'
											: row.profit_amount < 0
												? 'text-blue-500'
												: ''
									}
								>
									{row.profit_amount.toLocaleString()}
								</TableCell>
								<TableCell
									className={
										row.profit_rate > 0
											? 'text-red-500'
											: row.profit_rate < 0
												? 'text-blue-500'
												: ''
									}
								>
									{row.profit_rate > 0
										? '+'
										: row.profit_rate < 0
											? ''
											: ''}
									{row.profit_rate}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default TradeDetailTable;
