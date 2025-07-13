'use client';
import { useState } from 'react';

import { Plus, X } from 'lucide-react';

import InfoCard from '@/components/cards/Info';
import { AccountSelectDialog } from '@/components/dialogs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

interface Props {
	date: string;
}

const accounts = [
	{ id: '1', name: '신한 1234-5678' },
	{ id: '2', name: '카카오 9876-5432' },
];

const investTypes = ['단타', '중장기', '스윙', '기타'];
const emotionTypes = ['기쁨', '불안', '후회', '만족', '분노'];

const summaryCards = [
	{ description: '금일 매수 금액', value: '1,000,000원', icon: null },
	{ description: '금일 매도 금액', value: '1,200,000원', icon: null },
	{ description: '금일 정산 금액', value: '200,000원', icon: null },
	{ description: '금일 실현 손익률', value: '+5.0%', icon: null },
];

const detailRows = [
	{
		code: '005930',
		name: '삼성전자',
		buyAvg: 70000,
		buyQty: 10,
		sellAvg: 72000,
		sellQty: 10,
		fee: 1000,
		profit: 20000,
		yield: 2.8,
	},
	{
		code: '000660',
		name: 'SK하이닉스',
		buyAvg: 120000,
		buyQty: 5,
		sellAvg: 125000,
		sellQty: 5,
		fee: 1200,
		profit: -6000,
		yield: -1.0,
	},
	{
		code: '035420',
		name: 'NAVER',
		buyAvg: 200000,
		buyQty: 2,
		sellAvg: 200000,
		sellQty: 2,
		fee: 800,
		profit: 0,
		yield: 0,
	},
];

const BRAND_COLOR = 'bg-brand-shinhan-blue text-white';
const BRAND_OUTLINE =
	'focus-visible:outline-none focus-visible:ring-0 focus-visible:border-brand-shinhan-blue';

export default function NewTradeLogContainerClient({ date }: Props) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
	const [selectedInvestType, setSelectedInvestType] = useState<string | null>(
		null
	);
	const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
	const [newsUrls, setNewsUrls] = useState<string[]>(['']);

	const handleAddUrl = () => setNewsUrls((prev) => [...prev, '']);
	const handleRemoveUrl = (idx: number) =>
		setNewsUrls((prev) => prev.filter((_, i) => i !== idx));
	const handleChangeUrl = (idx: number, value: string) =>
		setNewsUrls((prev) => prev.map((url, i) => (i === idx ? value : url)));

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8">
			{/* 최상단 Title & 날짜 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">매매일지 작성</h2>
				<div className="text-base text-muted-foreground">{date}</div>
			</div>
			<div className="flex flex-row gap-10 w-full">
				{/* 좌측: 거래기록, 차트, 요약, 상세 */}
				<div className="flex-[2.2] min-w-[500px] max-w-[900px] flex flex-col gap-8">
					{/* 거래 기록 가져오기 버튼 */}
					<div className="flex items-start mb-2">
						<Button
							variant="outline"
							onClick={() => setDialogOpen(true)}
							className={BRAND_COLOR}
						>
							거래 기록 가져오기
						</Button>
						<AccountSelectDialog
							open={dialogOpen}
							accounts={accounts}
							selected={selectedAccounts}
							onChange={setSelectedAccounts}
							onConfirm={() => setDialogOpen(false)}
							onCancel={() => setDialogOpen(false)}
						/>
					</div>
					{/* 차트 자리 */}
					<Card className="h-64 flex items-center justify-center">
						<span className="text-muted-foreground">
							[차트 자리 - 차트 UI 확정 후 구현]
						</span>
					</Card>
					{/* 거래 요약 카드 */}
					<div className="grid grid-cols-4 gap-2 w-full">
						{summaryCards.map((card, i) => (
							<InfoCard
								key={i}
								value={
									<span className="text-base font-bold whitespace-nowrap">
										{card.value}
									</span>
								}
								description={card.description}
								icon={card.icon}
								index={i}
							/>
						))}
					</div>
					{/* 상세 거래내역 테이블 */}
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
									{detailRows.map((row, i) => (
										<TableRow key={i}>
											<TableCell>{row.code}</TableCell>
											<TableCell>{row.name}</TableCell>
											<TableCell>
												{row.buyAvg.toLocaleString()}
											</TableCell>
											<TableCell>{row.buyQty}</TableCell>
											<TableCell>
												{row.sellAvg.toLocaleString()}
											</TableCell>
											<TableCell>{row.sellQty}</TableCell>
											<TableCell>
												{row.fee.toLocaleString()}
											</TableCell>
											<TableCell
												className={
													row.profit > 0
														? 'text-red-500'
														: row.profit < 0
															? 'text-blue-500'
															: ''
												}
											>
												{row.profit.toLocaleString()}
											</TableCell>
											<TableCell
												className={
													row.yield > 0
														? 'text-red-500'
														: row.yield < 0
															? 'text-blue-500'
															: ''
												}
											>
												{row.yield > 0
													? '+'
													: row.yield < 0
														? ''
														: ''}
												{row.yield}%
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
				{/* 우측: 작성 폼 */}
				<div className="flex-[1] min-w-[320px] max-w-[360px] flex flex-col gap-8 sticky top-8 h-fit self-start">
					<Card>
						<CardContent className="space-y-6">
							{/* 투자 유형 (단일 선택) */}
							<div>
								<h3 className="font-semibold mb-2">
									투자 유형
								</h3>
								<div className="flex gap-2">
									{investTypes.map((type) => (
										<Badge
											key={type}
											variant={
												selectedInvestType === type
													? 'default'
													: 'outline'
											}
											onClick={() =>
												setSelectedInvestType(type)
											}
											className={`cursor-pointer ${
												selectedInvestType === type
													? 'bg-brand-shinhan-blue text-white'
													: 'border-brand-shinhan-blue text-brand-shinhan-blue'
											}`}
										>
											{type}
										</Badge>
									))}
								</div>
							</div>
							{/* 감정 유형 (다중 선택) */}
							<div>
								<h3 className="font-semibold mb-2">
									감정 유형
								</h3>
								<div className="flex gap-2 flex-wrap">
									{emotionTypes.map((type) => (
										<Badge
											key={type}
											variant={
												selectedEmotions.includes(type)
													? 'default'
													: 'outline'
											}
											onClick={() =>
												setSelectedEmotions(
													selectedEmotions.includes(
														type
													)
														? selectedEmotions.filter(
																(e) =>
																	e !== type
															)
														: [
																...selectedEmotions,
																type,
															]
												)
											}
											className={`cursor-pointer ${
												selectedEmotions.includes(type)
													? 'bg-brand-shinhan-blue text-white'
													: 'border-brand-shinhan-blue text-brand-shinhan-blue'
											}`}
										>
											{type}
										</Badge>
									))}
								</div>
							</div>
							{/* 매수/매도 근거 */}
							<div>
								<h3 className="font-semibold">
									매수/매도 근거
								</h3>
								<Textarea
									placeholder="매수/매도 근거를 입력하세요"
									className={BRAND_OUTLINE}
								/>
							</div>
							{/* 매매평가 */}
							<div>
								<h3 className="font-semibold">매매평가</h3>
								<Textarea
									placeholder="매매평가를 입력하세요"
									className={BRAND_OUTLINE}
								/>
							</div>
							{/* 관련 뉴스 */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-semibold">관련 뉴스</h3>
									<Button
										size="icon"
										variant="outline"
										onClick={handleAddUrl}
										className="border-brand-shinhan-blue text-brand-shinhan-blue"
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
													handleChangeUrl(
														idx,
														e.target.value
													)
												}
												className={BRAND_OUTLINE}
											/>
											{newsUrls.length > 1 && (
												<Button
													size="icon"
													variant="outline"
													onClick={() =>
														handleRemoveUrl(idx)
													}
													className="border-destructive text-destructive"
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
									className={`w-full ${BRAND_COLOR}`}
								>
									매매일지 저장
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
