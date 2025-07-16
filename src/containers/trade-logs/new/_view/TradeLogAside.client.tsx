'use client';

import { Plus, X } from 'lucide-react';

import { InvestmentType } from '@/@types/investment';
import { SentimentType } from '@/@types/sentiments';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import INVESTMENT_TYPES from '@/constants/investmentType';
import { SENTIMENTS } from '@/constants/sentiments';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

const BRAND_OUTLINE =
	'focus-visible:outline-none focus-visible:ring-0 focus-visible:border-brand-shinhan-blue';

const TradeLogAside = () => {
	const {
		investmentType,
		emotions,
		newsUrls,
		onSelectInvestmentType,
		onSelectEmotions,
		onAddNewsUrl,
		onRemoveNewsUrl,
		onChangeNewsUrl,
		rationalRef,
		evaluationRef,
		onSubmit,
	} = useCreateTradeLog();

	return (
		<aside className="flex-[1] min-w-[320px] max-w-[360px] flex flex-col gap-8 sticky top-20 h-fit self-start">
			<Card>
				<CardContent className="space-y-6">
					{/* 투자 유형 (단일 선택) */}
					<div className="space-y-2">
						<h3 className="font-semibold">투자 유형</h3>
						<div className="flex flex-wrap gap-2">
							{Object.entries(INVESTMENT_TYPES).map(
								([key, value]) => {
									return (
										<Badge
											key={key}
											variant={
												investmentType === key
													? 'default'
													: 'outline'
											}
											onClick={() =>
												onSelectInvestmentType(
													key as InvestmentType
												)
											}
											className={`cursor-pointer px-2 py-1.5 ${
												investmentType === key
													? 'bg-brand-shinhan-blue text-white'
													: 'border-brand-shinhan-blue text-brand-shinhan-blue'
											}`}
										>
											{value}
										</Badge>
									);
								}
							)}
						</div>
					</div>
					{/* 감정 유형 (다중 선택) */}
					<div className="space-y-2">
						<h3 className="font-semibold">감정 유형</h3>
						<div className="flex gap-2 flex-wrap">
							{Object.entries(SENTIMENTS).map((sentiment) => {
								const [key, value] = sentiment as [
									SentimentType,
									string,
								];
								return (
									<Badge
										key={key}
										variant={
											emotions.includes(key)
												? 'default'
												: 'outline'
										}
										onClick={() =>
											onSelectEmotions(
												emotions.includes(key)
													? emotions.filter(
															(e) => e !== key
														)
													: [
															...emotions,
															key as SentimentType,
														]
											)
										}
										className={`cursor-pointer px-2 py-1.5 ${
											emotions.includes(key)
												? 'bg-brand-shinhan-blue text-white'
												: 'border-brand-shinhan-blue text-brand-shinhan-blue'
										}`}
									>
										{value}
									</Badge>
								);
							})}
						</div>
					</div>
					{/* 매수/매도 근거 */}
					<div className="space-y-2">
						<h3 className="font-semibold">매수/매도 근거</h3>
						<Textarea
							placeholder="매수/매도 근거를 입력하세요"
							className={BRAND_OUTLINE}
							ref={rationalRef}
						/>
					</div>
					{/* 매매평가 */}
					<div className="space-y-2">
						<h3 className="font-semibold">매매평가</h3>
						<Textarea
							placeholder="매매평가를 입력하세요"
							className={BRAND_OUTLINE}
							ref={evaluationRef}
						/>
					</div>
					{/* 관련 뉴스 */}
					<div className="space-y-2">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold">관련 뉴스</h3>
							<Button
								size="icon"
								variant="ghost"
								onClick={() => onAddNewsUrl('')}
								className="text-brand-shinhan-blue bg-transparent cursor-pointer"
							>
								<Plus size={18} />
							</Button>
						</div>
						<div className="flex flex-col gap-2">
							{newsUrls.map((url, idx) => (
								<div
									key={idx}
									className="flex gap-2 items-center"
								>
									<Input
										placeholder="URL"
										value={url}
										onChange={(e) =>
											onChangeNewsUrl(idx, e.target.value)
										}
										className={BRAND_OUTLINE}
									/>
									{newsUrls.length > 1 && (
										<Button
											size="icon"
											variant="outline"
											onClick={() => onRemoveNewsUrl(idx)}
											className="border-destructive text-destructive cursor-pointer hover:bg-destructive hover:text-white"
										>
											<X size={18} />
										</Button>
									)}
								</div>
							))}
						</div>
					</div>
					{/* 저장 버튼 */}
					<div className="flex pt-4">
						<Button
							size="lg"
							className="w-full bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue cursor-pointer"
							onClick={onSubmit}
						>
							매매일지 저장
						</Button>
					</div>
				</CardContent>
			</Card>
		</aside>
	);
};

export default TradeLogAside;
