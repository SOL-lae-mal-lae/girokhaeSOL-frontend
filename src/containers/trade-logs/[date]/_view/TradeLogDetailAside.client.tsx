'use client';

import { FC, useEffect, useState } from 'react';

import Link from 'next/link';

import { TradeLogAIResult } from '@/@types/tradeLogs';
import HelpTooltip from '@/components/custom/HelpTooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import INVESTMENT_TYPES from '@/constants/investmentType';
import { SENTIMENTS } from '@/constants/sentiments';

interface Props {
	tradeLog: TradeLogAIResult;
	onChangeAiSheetOpen: (status: boolean) => void;
	fetchAiEvaluation: () => void;
	isLoading: boolean;
	hasResult: boolean;
}

const TradeLogDetailAside: FC<Props> = ({
	tradeLog,
	onChangeAiSheetOpen,
	fetchAiEvaluation,
	isLoading,
	hasResult,
}) => {
	const {
		investment_type,
		sentiments,
		news_links,
		rationale,
		evaluation,
		ai_result,
	} = tradeLog;
	const [hasAiEvaluation, setHasAiEvaluation] = useState(ai_result !== null);

	const handleClickAiEvaluation = () => {
		if (hasAiEvaluation) {
			onChangeAiSheetOpen(true);
		} else {
			fetchAiEvaluation();
		}
	};

	useEffect(() => {
		if (hasResult) {
			setHasAiEvaluation(true);
		}
	}, [hasResult]);

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

				{/* 뉴스 링크 */}
				{news_links.length > 0 && (
					<>
						<Separator />
						<div>
							<h4 className="font-medium text-sm text-muted-foreground mb-2">
								참고 뉴스
							</h4>
							<div className="space-y-2">
								{news_links.map((link) => (
									<Link
										key={link.url}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-sm text-blue-600 hover:text-blue-800 underline break-all"
									>
										{link.url}
									</Link>
								))}
							</div>
						</div>
					</>
				)}
				<Separator />
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2 items-center">
						<h4 className="font-medium text-sm text-muted-foreground">
							피드백 받기
						</h4>
						<HelpTooltip text="작성한 매매일지를 기반으로 AI 피드백을 받을 수 있습니다." />
					</div>
					<Button
						className="w-full bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue cursor-pointer"
						onClick={handleClickAiEvaluation}
						disabled={isLoading}
					>
						{isLoading && <Spinner />}
						{!isLoading && hasAiEvaluation ? '결과 확인하기' : '피드백 받기'}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default TradeLogDetailAside;
