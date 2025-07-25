'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { LockKeyhole, X } from 'lucide-react';
import { toast } from 'sonner';

import { StockItem } from '@/@types/stockItem';
import StockSearch from '@/components/custom/StockSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
	TradeDetailTable,
	TradeSummary,
} from '@/containers/trade-logs/[date]/_view';
import StockChart from '@/containers/trade-logs/[date]/_view/StockChart.client';
import { createPost, getTradeDates } from '@/services/post';
import { getTradeLogByDate } from '@/services/trade-logs';

export default function CommunityPostWrite() {
	const [shareDiary, setShareDiary] = useState(false);
	const [shareSensitive, setShareSensitive] = useState(false);
	const [selectedDate, setSelectedDate] = useState(''); // 실제로는 일지 날짜 목록 필요
	const [selectedStock, setSelectedStock] = useState<StockItem[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [popOpen, setPopOpen] = useState(false);

	const { data: tradeLog, isLoading: isLoadingTradeLog } = useQuery({
		queryKey: ['tradeLog', 'detail', selectedDate],
		queryFn: () => getTradeLogByDate(selectedDate),
		enabled: !!selectedDate, // 날짜가 선택됐을 때만 fetch
	});

	const { data: diaryList } = useQuery({
		queryKey: ['diaryList'],
		queryFn: () => getTradeDates(),
	});

	const router = useRouter();

	const validSelectedStock = selectedStock.filter(
		(s): s is StockItem =>
			s && typeof s === 'object' && 'stock_code' in s && 'stock_name' in s
	);

	const handleSelectStock = (stock: StockItem) => {
		setSelectedStock((prev) => [...prev, stock]);
	};

	const handlePopover = (state: boolean) => {
		setPopOpen(state);
	};

	return (
		<div className="w-full h-full">
			<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
				<h2 className="text-2xl font-bold">게시글 작성</h2>
				<div className="flex flex-col md:flex-row gap-8">
					{/* 왼쪽: 매매일지 내용 */}
					<div className="flex-1 border rounded-lg p-6 relative overflow-hidden mb-5">
						<div className="w-full p-0 relative z-10">
							<div className="mb-4">
								<Select value={selectedDate} onValueChange={setSelectedDate}>
									<SelectTrigger className="w-[200px] cursor-pointer">
										<SelectValue placeholder="날짜 선택" />
									</SelectTrigger>
									<SelectContent>
										{diaryList?.map((date) => (
											<SelectItem
												className="cursor-pointer"
												key={date.id}
												value={date.date}
											>
												{date.date}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="text-xl text-center text-muted-foreground mt-5">
								{isLoadingTradeLog ? (
									<div className="flex items-center justify-center">
										<LoadingSpinner text="매매일지를 불러오는 중..." />
									</div>
								) : !selectedDate ? (
									<div className="text-body1">날짜를 선택해주세요.</div>
								) : !tradeLog ? (
									<div className="text-body1">
										해당 날짜의 매매일지가 없습니다.
									</div>
								) : (
									<Card className="w-full flex flex-col gap-8">
										<CardContent className="w-full flex flex-col gap-8">
											<StockChart
												stockChartList={tradeLog.charts}
												chartWidth={500}
											/>
											{shareSensitive ? (
												<div className="flex flex-col gap-8">
													<TradeSummary
														summaries={tradeLog.summaries}
														isSensitive={false}
													/>
													<TradeDetailTable
														readOnly
														getFinanceData={() => {}}
														tradeDetails={tradeLog.trade_details}
													/>
												</div>
											) : (
												<div className="space-y-6">
													<div className="text-center pb-4 border-b border-gray-200">
														<h2 className="text-xl font-semibold text-gray-900 mb-2">
															거래 기록
														</h2>
														<p className="text-sm text-gray-600">
															해당 날짜의 매매 현황을 확인하세요
														</p>
													</div>
													<div className="bg-gray-50 rounded-lg p-4">
														<Table>
															<TableHeader>
																<TableRow>
																	<TableHead>종목명</TableHead>
																	<TableHead>매수 평균가</TableHead>
																	<TableHead>매도 평균가</TableHead>
																	<TableHead>수익률</TableHead>
																</TableRow>
															</TableHeader>
															<TableBody>
																{tradeLog.trade_details.map((row) => (
																	<TableRow
																		className="text-left"
																		key={row.stock_code}
																	>
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
																			{row.avg_sell_price === 0 ? (
																				<span className="text-muted-foreground">
																					-
																				</span>
																			) : (
																				row.avg_sell_price.toLocaleString()
																			)}
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
												</div>
											)}

											{/* 매수/매도 근거 섹션 */}
											<div className="space-y-4 pt-6 border-t border-gray-200">
												<div className="text-center pb-3">
													<h3 className="text-lg font-semibold text-gray-900 mb-1">
														매수/매도 근거
													</h3>
													<p className="text-sm text-gray-600">
														거래 결정의 이유와 배경
													</p>
												</div>
												<div className="bg-brand-light-blue/30 rounded-lg p-4 border">
													<div className="text-gray-800 leading-relaxed text-body2 text-start">
														{tradeLog.rationale
															.split('\n')
															.map((line, index) => (
																<p key={index} className="mb-2 last:mb-0">
																	{line}
																</p>
															))}
													</div>
												</div>
											</div>

											{/* 평가 섹션 */}
											<div className="space-y-4 pt-6 border-t border-gray-200">
												<div className="text-center pb-3">
													<h3 className="text-lg font-semibold text-gray-900 mb-1">
														평가
													</h3>
													<p className="text-sm text-gray-600">
														거래 결과에 대한 분석과 평가
													</p>
												</div>
												<div className="bg-brand-light-blue/30 rounded-lg p-4 border text-body2 text-start">
													<div className="text-gray-800 leading-relaxed">
														{tradeLog.evaluation
															.split('\n')
															.map((line, index) => (
																<p key={index} className="mb-2 last:mb-0">
																	{line}
																</p>
															))}
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</div>
						{!shareDiary && (
							<div className="absolute inset-0 bg-gray-200/30 backdrop-blur-sm z-20 pointer-events-auto flex items-center justify-center">
								<LockKeyhole
									className="text-gray-400"
									width={100}
									height={100}
								/>
							</div>
						)}
					</div>
					{/* 오른쪽: 게시글 입력 폼 */}
					<div className="w-[40%] flex-shrink-0 flex flex-col">
						<div className="flex items-center gap-4 mb-4">
							<Label className="flex items-center gap-1">
								<Switch
									checked={shareDiary}
									onCheckedChange={setShareDiary}
									className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
								/>
								일지공유
							</Label>
							<Label className="flex items-center gap-1">
								<Switch
									checked={shareSensitive}
									disabled={!shareDiary}
									onCheckedChange={setShareSensitive}
									className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
								/>
								민감공유
							</Label>
						</div>
						<div className="mb-4">
							<Label className="block font-semibold mb-2">제목</Label>
							<Input
								ref={inputRef}
								className="w-full border rounded px-3 py-2"
								placeholder="제목을 입력하세요"
							/>
						</div>
						<div className="mb-4">
							<Label className="block font-semibold mb-2">내용</Label>
							<Textarea
								ref={textareaRef}
								className="w-full h-[250px] border rounded px-3 py-2 min-h-[120px] resize-none"
								placeholder="내용을 입력하세요"
							/>
						</div>
						{/* 종목명 검색하기 구현.
                    input에 종목명 입력 후 아래 콤보 박스에서 종목 클릭 또는 엔터 시,
                    input에 종목들이 입력됨 */}
						<div className="mb-4">
							<div className="w-full flex flex-row items-center gap-2">
								<Label className="block font-semibold">태그 추가</Label>
								<StockSearch
									popoverOpen={popOpen}
									onControlPopover={handlePopover}
									selectedStock={selectedStock}
									onSelectStock={handleSelectStock}
								/>
							</div>

							<div className="relative w-full gap-1 mt-4 flex flex-row flex-wrap ">
								{validSelectedStock.map((stock) => (
									<Badge
										className="bg-brand-shinhan-blue cursor-pointer hover:bg-brand-navy-blue"
										key={stock.stock_code}
									>
										<div className="flex flex-row items-center gap-2 justify-between ">
											<p className="text-xs">{stock.stock_name}</p>
											<X
												width={10}
												className="cursor-pointer"
												onClick={() => {
													setSelectedStock(
														selectedStock.filter(
															(s) => s.stock_code !== stock.stock_code
														)
													);
												}}
											/>
										</div>
									</Badge>
								))}
							</div>
						</div>
						<Button
							className="w-full bg-brand-shinhan-blue text-white mt-10 py-2 rounded cursor-pointer hover:bg-brand-navy-blue"
							onClick={() => {
								// 매매일지 공유 시, 날짜 선택, 리스트 없으면 토스트 띄우고 종료
								if (inputRef.current && inputRef.current.value === '') {
									toast.error('제목과 내용을 입력해주세요.');
									return;
								}
								if (
									textareaRef.current &&
									textareaRef.current.value.length < 10
								) {
									toast.error('내용은 최소 10자 이상이어야 합니다.');
									return;
								}
								if (shareDiary) {
									if (diaryList && selectedDate) {
										const diaryId = diaryList.find(
											(d) => d.date === selectedDate
										)!.id;
										createPost({
											post_type: shareDiary,
											title: inputRef.current?.value ?? '',
											content: textareaRef.current?.value ?? '',
											trade_log_id: diaryId,
											is_public: shareSensitive,
											tags: selectedStock,
										}).then((res) => {
											if (res) {
												router.push('/community');
											} else {
												toast.error('게시글 작성에 실패했습니다.');
											}
										});
									} else {
										toast.error('날짜를 선택해주세요.');
										return;
									}
									// 일반 글은 id 없음, 종목 선택 없음
								} else {
									createPost({
										post_type: shareDiary,
										title: inputRef.current?.value ?? '',
										content: textareaRef.current?.value ?? '',
										trade_log_id: null,
										is_public: shareSensitive,
										tags: selectedStock,
									}).then((res) => {
										if (res) {
											router.push('/community');
										} else {
											toast.error('게시글 작성에 실패했습니다.');
										}
									});
								}
							}}
						>
							올리기
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
