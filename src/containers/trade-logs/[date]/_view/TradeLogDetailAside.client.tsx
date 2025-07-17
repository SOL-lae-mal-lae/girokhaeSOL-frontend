'use client';

import { FC } from 'react';

import { TradeLog } from '@/@types/tradeLogs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import INVESTMENT_TYPES from '@/constants/investmentType';
import { SENTIMENTS } from '@/constants/sentiments';

interface Props {
	tradeLog: TradeLog;
}

const TradeLogDetailAside: FC<Props> = ({ tradeLog }) => {
	const { investment_type, sentiments, news_links, rationale, evaluation } =
		tradeLog;

	return (
		<Card className="flex-1 min-w-[300px]">
			<CardHeader>
				<CardTitle>매매일지 내용</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* 투자 유형 */}
				<div>
					<h4 className="font-medium text-sm text-muted-foreground mb-2">
						투자 유형
					</h4>
					<Badge className="bg-brand-shinhan-blue text-white hover:bg-brand-shinhan-blue/90 px-2 py-1.5">
						{INVESTMENT_TYPES[investment_type]}
					</Badge>
				</div>

				<Separator />

				{/* 투자 심리 */}
				<div>
					<h4 className="font-medium text-sm text-muted-foreground mb-2">
						투자 심리
					</h4>
					<div className="flex flex-wrap gap-1">
						{sentiments.map((sentiment, index) => (
							<Badge
								key={index}
								className="bg-brand-shinhan-blue text-white hover:bg-brand-shinhan-blue/90 px-2 py-1.5"
							>
								{SENTIMENTS[sentiment]}
							</Badge>
						))}
					</div>
				</div>

				<Separator />

				{/* 뉴스 링크 */}
				{news_links.length > 0 && (
					<>
						<div>
							<h4 className="font-medium text-sm text-muted-foreground mb-2">
								참고 뉴스
							</h4>
							<div className="space-y-2">
								{news_links.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-sm text-blue-600 hover:text-blue-800 underline break-all"
									>
										{link.url}
									</a>
								))}
							</div>
						</div>
						<Separator />
					</>
				)}

				{/* 매매 근거 */}
				<div>
					<h4 className="font-medium text-sm text-muted-foreground mb-2">
						매매 근거
					</h4>
					<div className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
						{rationale || '-'}
					</div>
				</div>

				<Separator />

				{/* 투자 평가 */}
				<div>
					<h4 className="font-medium text-sm text-muted-foreground mb-2">
						투자 평가
					</h4>
					<div className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
						{evaluation || '-'}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TradeLogDetailAside;
