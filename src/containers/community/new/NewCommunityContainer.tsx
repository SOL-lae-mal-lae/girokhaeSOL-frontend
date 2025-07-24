'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import {
	TradeDetailTable,
	TradeLogDetailAside,
	TradeSummary,
} from '@/containers/trade-logs/[date]/_view';
import StockChart from '@/containers/trade-logs/[date]/_view/StockChart.client';
import { getTradeLogByDate } from '@/services/trade-logs';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, LockKeyhole, X } from 'lucide-react';
import { createPost, getStockList, getTradeDates } from '@/services/post';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { StockItem } from '@/@types/stockItem';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CommunityPostWrite() {
	const [shareDiary, setShareDiary] = useState(false);
	const [shareSensitive, setShareSensitive] = useState(false);
	const [selectedDate, setSelectedDate] = useState(''); // 실제로는 일지 날짜 목록 필요
	const [selectedStock, setSelectedStock] = useState<StockItem[]>([]);
	const [popOpen, setPopOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { data: tradeLog, isLoading: isLoadingTradeLog } = useQuery({
		queryKey: ['tradeLog', 'detail', selectedDate],
		queryFn: () => getTradeLogByDate(selectedDate),
		enabled: !!selectedDate, // 날짜가 선택됐을 때만 fetch
	});
	const { data: stockList, isLoading: isStockLoading } = useQuery({
		queryKey: ['stockList'],
		queryFn: () => getStockList(),
	});

	const { data: diaryList } = useQuery({
		queryKey: ['diaryList'],
		queryFn: () => getTradeDates(),
	});

	const [value, setValue] = useState('');
	const router = useRouter();

	const validSelectedStock = selectedStock.filter(
		(s): s is StockItem =>
			s && typeof s === 'object' && 'stock_code' in s && 'stock_name' in s
	);

	if (isStockLoading) {
		return <LoadingSpinner text="종목 가져오는 중..." />;
	}

	return (
		<div className="w-full max-w-7xl h-full mx-auto px-8 flex flex-col gap-4 mt-30 mb-20">
			<h2 className="text-2xl font-bold">게시글 작성</h2>
			<div className="flex flex-col md:flex-row gap-8">
				{/* 왼쪽: 매매일지 내용 */}
				<div className="flex-1 border rounded-lg p-6 relative overflow-hidden">
					<div className="w-full p-0 relative z-10">
						<div className="mb-4">
							<label className="font-semibold mr-2">
								날짜선택
							</label>
							<select
								className="border rounded px-2 py-1"
								value={selectedDate}
								onChange={(e) =>
									setSelectedDate(e.target.value)
								}
								disabled={!shareDiary}
							>
								<option value="">날짜 선택</option>
								{diaryList
									? diaryList?.map((date) => (
											<option
												key={date.id}
												value={date.date}
											>
												{date.date}
											</option>
										))
									: ''}
							</select>
						</div>
						<div className="text-xl text-center text-gray-500 mt-5">
							{isLoadingTradeLog ? (
								<div className="flex items-center justify-center">
									<LoadingSpinner text="매매일지를 불러오는 중..." />
								</div>
							) : !selectedDate ? (
								<div>날짜를 선택해주세요.</div>
							) : !tradeLog ? (
								<div>해당 날짜의 매매일지가 없습니다.</div>
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
													summaries={
														tradeLog.summaries
													}
												/>
												<TradeDetailTable
													getFinanceData={() => {}}
													tradeDetails={
														tradeLog.trade_details
													}
												/>
											</div>
										) : (
											<div>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>
																종목명
															</TableHead>
															<TableHead>
																매수 평균가
															</TableHead>
															<TableHead>
																매도 평균가
															</TableHead>
															<TableHead>
																수익률
															</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{tradeLog.trade_details.map(
															(row) => (
																<TableRow
																	className="text-left"
																	key={
																		row.stock_code
																	}
																>
																	<TableCell>
																		{
																			row.stock_name
																		}
																	</TableCell>
																	<TableCell>
																		{row.avg_buy_price ===
																		0 ? (
																			<span className="text-muted-foreground">
																				-
																			</span>
																		) : (
																			row.avg_buy_price.toLocaleString()
																		)}
																	</TableCell>
																	<TableCell>
																		{row.avg_sell_price ===
																		0 ? (
																			<span className="text-muted-foreground">
																				-
																			</span>
																		) : (
																			row.avg_sell_price.toLocaleString()
																		)}
																	</TableCell>
																	<TableCell
																		className={
																			row.profit_rate ===
																			0
																				? 'text-muted-foreground'
																				: row.profit_rate >
																					  0
																					? 'text-red-500'
																					: 'text-blue-500'
																		}
																	>
																		{row.profit_rate ===
																		0 ? (
																			'-'
																		) : (
																			<>
																				{row.profit_rate >
																				0
																					? '+'
																					: ''}
																				{
																					row.profit_rate
																				}

																				%
																			</>
																		)}
																	</TableCell>
																</TableRow>
															)
														)}
													</TableBody>
												</Table>
											</div>
										)}
										<p>
											tradeLog.rationale:
											{tradeLog.rationale}
										</p>
										<p>
											tradeLog.evaluation:
											{tradeLog.evaluation}
										</p>
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
						<label className="flex items-center gap-1">
							<Switch
								checked={shareDiary}
								onCheckedChange={setShareDiary}
								className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
							/>
							일지공유
						</label>
						<label className="flex items-center gap-1">
							<Switch
								checked={shareSensitive}
								disabled={!shareDiary}
								onCheckedChange={setShareSensitive}
								className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
							/>
							민감공유
						</label>
					</div>
					<div className="mb-4">
						<label className="block font-semibold mb-1">제목</label>
						<input
							className="w-full border rounded px-3 py-2"
							placeholder="제목을 입력하세요"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block font-semibold mb-1">내용</label>
						<textarea
							className="w-full h-[250px] border rounded px-3 py-2 min-h-[120px] resize-none"
							placeholder="내용을 입력하세요"
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					{/* 종목명 검색하기 구현.
                    input에 종목명 입력 후 아래 콤보 박스에서 종목 클릭 또는 엔터 시,
                    input에 종목들이 입력됨 */}
					<div className="mb-4">
						<div className="flex flex-row items-center gap-5">
							<label className="block font-semibold">
								종목명
							</label>
							<Popover open={popOpen} onOpenChange={setPopOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={popOpen}
										className="w-[200px] justify-between"
									>
										{value
											? stockList?.find(
													(stock) =>
														stock.stock_name ===
														value
												)?.stock_name
											: '종목명 선택'}
										<ChevronsUpDown className="opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="종목명 검색"
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>
												검색 결과가 없습니다.
											</CommandEmpty>
											<CommandGroup>
												{stockList?.map((stock) => {
													return (
														<CommandItem
															key={
																stock.stock_code
															}
															value={
																stock.stock_name
															}
															onSelect={(
																currentValue
															) => {
																setValue(
																	currentValue ===
																		value
																		? ''
																		: currentValue
																);
																if (
																	!selectedStock.some(
																		(s) =>
																			s.stock_code ===
																			stock.stock_code
																	)
																) {
																	setSelectedStock(
																		(
																			prev
																		) => [
																			...prev,
																			stock,
																		]
																	);
																}

																setPopOpen(
																	false
																);
															}}
														>
															{stock.stock_name}
														</CommandItem>
													);
												})}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>

						<div className="relative w-full gap-1 mt-4 flex flex-row flex-wrap ">
							{validSelectedStock.map((stock) => (
								<Badge
									className="bg-brand-shinhan-blue cursor-pointer hover:bg-brand-navy-blue"
									key={stock.stock_code}
								>
									<div className="flex flex-row items-center gap-2 justify-between ">
										<p className="text-xs">
											{stock.stock_name}
										</p>
										<X
											width={10}
											onClick={() => {
												setSelectedStock(
													selectedStock.filter(
														(s) =>
															s.stock_code !==
															stock.stock_code
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
							if (title === '') {
								toast.error('제목과 내용을 입력해주세요.');
								return;
							}
							if (content.length < 10) {
								toast.error(
									'내용은 최소 10자 이상이어야 합니다.'
								);
								return;
							}
							if (shareDiary) {
								if (diaryList && selectedDate) {
									const diaryId = diaryList.find(
										(d) => d.date === selectedDate
									)!.id;
									createPost({
										post_type: shareDiary,
										title: title,
										content: content,
										trade_log_id: diaryId,
										is_public: shareSensitive,
										tags: selectedStock,
									}).then((res) => {
										if (res) {
											router.push('/community/');
										} else {
											toast.error(
												'게시글 작성에 실패했습니다.'
											);
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
									title: title,
									content: content,
									trade_log_id: null,
									is_public: shareSensitive,
									tags: selectedStock,
								}).then((res) => {
									if (res) {
										router.push('/community/');
									} else {
										toast.error(
											'게시글 작성에 실패했습니다.'
										);
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
	);
}
