'use client';

import { useState } from 'react';

import { Plus, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import INVESTMENT_TYPES from '@/constants/investmentType';
import { SENTIMENTS } from '@/constants/sentiments';

const BRAND_COLOR = 'bg-brand-shinhan-blue text-white';
const BRAND_OUTLINE =
	'focus-visible:outline-none focus-visible:ring-0 focus-visible:border-brand-shinhan-blue';

const TradeLogAside = () => {
	const [selectedInvestType, setSelectedInvestType] = useState<string | null>(
		null
	);
	const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
	const [newsUrls, setNewsUrls] = useState<string[]>(['']);

	const handleAddUrl = () => {
		setNewsUrls((prev) => [...prev, '']);
	};

	const handleRemoveUrl = (idx: number) => {
		setNewsUrls((prev) => prev.filter((_, i) => i !== idx));
	};

	const handleChangeUrl = (idx: number, value: string) => {
		setNewsUrls((prev) => prev.map((url, i) => (i === idx ? value : url)));
	};

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
												selectedInvestType === key
													? 'default'
													: 'outline'
											}
											onClick={() =>
												setSelectedInvestType(key)
											}
											className={`cursor-pointer px-2 py-1.5 ${
												selectedInvestType === key
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
							{Object.entries(SENTIMENTS).map(([key, value]) => (
								<Badge
									key={key}
									variant={
										selectedEmotions.includes(key)
											? 'default'
											: 'outline'
									}
									onClick={() =>
										setSelectedEmotions(
											selectedEmotions.includes(key)
												? selectedEmotions.filter(
														(e) => e !== key
													)
												: [...selectedEmotions, key]
										)
									}
									className={`cursor-pointer px-2 py-1.5 ${
										selectedEmotions.includes(key)
											? 'bg-brand-shinhan-blue text-white'
											: 'border-brand-shinhan-blue text-brand-shinhan-blue'
									}`}
								>
									{value}
								</Badge>
							))}
						</div>
					</div>
					{/* 매수/매도 근거 */}
					<div className="space-y-2">
						<h3 className="font-semibold">매수/매도 근거</h3>
						<Textarea
							placeholder="매수/매도 근거를 입력하세요"
							className={BRAND_OUTLINE}
						/>
					</div>
					{/* 매매평가 */}
					<div className="space-y-2">
						<h3 className="font-semibold">매매평가</h3>
						<Textarea
							placeholder="매매평가를 입력하세요"
							className={BRAND_OUTLINE}
						/>
					</div>
					{/* 관련 뉴스 */}
					<div className="space-y-2">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold">관련 뉴스</h3>
							<Button
								size="icon"
								variant="ghost"
								onClick={handleAddUrl}
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
											handleChangeUrl(idx, e.target.value)
										}
										className={BRAND_OUTLINE}
									/>
									{newsUrls.length > 1 && (
										<Button
											size="icon"
											variant="outline"
											onClick={() => handleRemoveUrl(idx)}
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
						<Button size="lg" className={`w-full ${BRAND_COLOR}`}>
							매매일지 저장
						</Button>
					</div>
				</CardContent>
			</Card>
		</aside>
	);
};

export default TradeLogAside;
