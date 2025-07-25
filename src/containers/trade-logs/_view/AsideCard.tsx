import { FC } from 'react';

import { Lightbulb } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SENTIMENTS, SENTIMENTS_COLORS } from '@/constants/sentiments';
import { formatNumber } from '@/lib/format';

interface Props {
	totalBuyAmount: number;
	totalSellAmount: number;
	totalCommissionAndTax: number;
	sentiments: string[];
	topBuy: string[];
}

const AsideCard: FC<Props> = ({
	totalBuyAmount,
	totalSellAmount,
	totalCommissionAndTax,
	sentiments,
	topBuy,
}) => {
	return (
		<Card className="flex-1/4 w-full border border-gray-300 my-8 rounded-[8px] shadow-md p-6 flex flex-col">
			<CardHeader className="flex gap-2 items-center p-0 mb-4">
				<Lightbulb />
				<CardTitle className="text-lg">이번 달 요약</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col justify-between p-0 gap-4">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<span className="text-body2 text-muted-foreground">
							총 매수금액
						</span>
						<span className="text-body1 font-semibold">
							{formatNumber(totalBuyAmount)}원
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-body2 text-muted-foreground">
							총 매도금액
						</span>
						<span className="text-body1 font-semibold">
							{formatNumber(totalSellAmount)}원
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-body2 text-muted-foreground">
							총 수수료/세금
						</span>
						<span className="text-body1 font-semibold">
							{formatNumber(totalCommissionAndTax)}원
						</span>
					</div>
					{/* <div className="flex flex-col">
						<span className="text-body2 text-muted-foreground">
							손익률
						</span>
						<span className="text-body1 font-semibold">
							{formatNumber(profitRate)}%
						</span>
					</div> */}
					<div className="flex flex-col">
						<span className="text-body2 text-muted-foreground">
							나의 거래 심리 유형
						</span>
						<span className="text-body1 font-semibold">
							{sentiments.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{sentiments.map((s, i) => (
										<Badge
											key={i}
											className={
												SENTIMENTS_COLORS[s as keyof typeof SENTIMENTS] || ''
											}
										>
											{SENTIMENTS[s as keyof typeof SENTIMENTS]}
										</Badge>
									))}
								</div>
							)}
						</span>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col">
					<div className="font-semibold mb-2 text-base">상위 3개 매수 종목</div>
					<ul className="border rounded divide-y bg-white">
						{topBuy.map((item) => (
							<li
								key={item}
								className="px-3 py-3 text-base first:rounded-t last:rounded-b"
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default AsideCard;
