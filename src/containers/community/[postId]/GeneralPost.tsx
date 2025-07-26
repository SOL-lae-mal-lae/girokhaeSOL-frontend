'use client';

import { FC, useState } from 'react';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	ArrowLeft,
	Send,
	Share2,
	Trash2,
	MoreVertical,
	Edit,
} from 'lucide-react';
import { toast } from 'sonner';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table';
import {
	TradeDetailTable,
	TradeSummary,
} from '@/containers/trade-logs/[date]/_view';
import StockChart from '@/containers/trade-logs/[date]/_view/StockChart.client';
import { createComment, deleteComment, getComments } from '@/services/comment';
import {
	deleteCommunityPost,
	getCommunityPost,
} from '@/services/community-all-post';
import { getTradeLogById } from '@/services/trade-logs';

const GeneralPost: FC = () => {
	const router = useRouter();
	const params = useParams();
	const postId = params.postId as string;
	const queryClient = useQueryClient();
	const [commentContent, setCommentContent] = useState('');
	const { user } = useUser();
	const { data, isLoading } = useQuery({
		queryKey: ['community-post', postId],
		queryFn: () => getCommunityPost(postId),
	});

	// post_type이 true일 때만 매매일지 useQuery 활성화
	const { data: tradeLog, isLoading: isLogLoading } = useQuery({
		queryKey: ['trade-log', data?.trade_log_id],
		queryFn: () => getTradeLogById(data!.user_id, data!.trade_log_id),
		enabled: !!data && data.post_type, // post_type이 true일 때만 fetch
	});
	const { data: commentData } = useQuery({
		queryKey: ['community-comment', postId],
		queryFn: () => getComments(postId),
	});

	const { mutate: deletePost } = useMutation({
		mutationFn: () => deleteCommunityPost(postId),
		onSuccess: (data) => {
			if (data) {
				toast.success('게시글이 삭제되었습니다.');
				router.push('/community');
				return;
			}
			toast.error('게시글 삭제에 실패했습니다.');
		},
	});
	const { mutate: deleteComments } = useMutation({
		mutationFn: (commentId: string) => deleteComment(postId, commentId),
		onSuccess: (data) => {
			if (data) {
				toast.success('댓글이 삭제되었습니다.');
				// 댓글 목록 새로고침
				queryClient.invalidateQueries({
					queryKey: ['community-comment', postId],
				});
				return;
			}
			toast.error('댓글 삭제에 실패했습니다.');
		},
	});

	const { mutate: postComments } = useMutation({
		mutationFn: (content: string) => createComment(postId, content),
		onSuccess: (data) => {
			if (data) {
				toast.success('댓글이 작성되었습니다.');
				// 댓글 목록 새로고침
				queryClient.invalidateQueries({
					queryKey: ['community-comment', postId],
				});
				return;
			}
			toast.error('댓글 작성에 실패했습니다.');
		},
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<LoadingSpinner text="게시글 불러오는 중..." />
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full h-full">
			{/* 상단 네비게이션 */}
			<div className="flex items-center justify-between p-4 border-b bg-white sticky top-14 z-10">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						className="p-2"
						onClick={() => router.back()}
					>
						<ArrowLeft size={20} />
					</Button>
					<h1 className="text-lg font-semibold text-gray-900 truncate ">
						{data?.title}
					</h1>
				</div>
				<Button variant="ghost" size="sm" className="p-2">
					<Share2 size={20} />
				</Button>
			</div>

			{/* 게시글 내용 */}
			<div className="flex-1 p-4">
				{data?.post_type ? (
					<Card className="mb-6">
						<CardContent>
							{/* 작성자 정보 */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
										{data?.user_id === user?.id && user?.imageUrl ? (
											<Image
												src={user.imageUrl}
												alt="프로필 이미지"
												className="w-full h-full object-cover"
												width={40}
												height={40}
											/>
										) : (
											<Image
												src="/images/userImage.png"
												alt="기본 프로필 이미지"
												className="w-full h-full object-cover"
												width={40}
												height={40}
											/>
										)}
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{data?.nickname}
										</span>
										<span className="text-sm text-gray-500">
											{/* {post?.created_at.toLocaleString()} */}
											{data?.created_at &&
												new Date(data.created_at).toLocaleString('ko-KR', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
													hour12: false,
												})}
										</span>
									</div>
								</div>
								{/* 본인이 작성한 글에만 메뉴 버튼 표시 */}
								{user && user.id === data?.user_id && (
									<div>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="p-2 hover:bg-gray-100"
												>
													<MoreVertical size={16} />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-32 p-0" align="end">
												<div className="flex flex-col">
													<button
														className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
														onClick={() => {
															// 수정 기능은 나중에 구현
															toast.info('수정 기능은 준비 중입니다.');
														}}
													>
														<Edit size={14} className="text-gray-500" />
														수정하기
													</button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
																<Trash2 size={14} className="text-red-600" />
																삭제하기
															</button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>게시글 삭제</AlertDialogTitle>
																<AlertDialogDescription>
																	이 게시글을 삭제하시겠습니까?
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>취소</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => deletePost()}
																	className="bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue"
																>
																	삭제
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</PopoverContent>
										</Popover>
									</div>
								)}
							</div>

							{data?.post_type ? (
								<Card className="flex flex-row gap-2 mt-8">
									{!tradeLog && isLogLoading ? (
										<div className="flex justify-center items-center h-full">
											<LoadingSpinner text="매매일지를 불러오는 중..." />
										</div>
									) : (
										tradeLog && (
											<CardContent className="grid grid-cols-2 gap-12">
												<StockChart
													stockChartList={tradeLog.charts}
													chartWidth={500}
												/>
												<TradeSummary
													summaries={
														data?.is_public
															? tradeLog.summaries
															: {
																	total_buy_amount: 0,
																	total_sell_amount: 0,
																	total_cmsn_tax: 0,
																	settlement_amount: 0,
																	profit_rate: 0,
																}
													}
													isSensitive={!data?.is_public}
												/>

												{data?.is_public ? (
													<TradeDetailTable
														getFinanceData={() => {}}
														tradeDetails={tradeLog.trade_details}
														isCommunity={true}
													/>
												) : (
													<div>
														<h1 className="text-heading3 font-bold">
															거래 기록
														</h1>
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
												)}

												<div className="flex flex-col gap-3">
													<h1 className="text-heading3 font-bold">
														매매일지 분석
													</h1>
													<Card className="min-h-[200px]">
														<CardHeader>
															<h3 className="text-lg font-semibold text-gray-900">
																매매 근거
															</h3>
														</CardHeader>
														<CardContent>
															<p className="text-gray-700 leading-relaxed mb-2">
																{tradeLog?.rationale}
															</p>
														</CardContent>
													</Card>
													<Card className="min-h-[200px]">
														<CardHeader>
															<h3 className="text-lg font-semibold text-gray-900">
																투자 평가
															</h3>
														</CardHeader>
														<CardContent>
															<p className="text-gray-700 leading-relaxed mb-2">
																{tradeLog?.evaluation}
															</p>
														</CardContent>
													</Card>
												</div>
											</CardContent>
										)
									)}
								</Card>
							) : null}

							{/* 게시글 내용 */}
							<div className="mb-6 mt-10">
								{data?.content.split('\n').map((line, index) => (
									<p key={index} className="text-gray-700 leading-relaxed mb-2">
										{line}
									</p>
								))}
							</div>
						</CardContent>
					</Card>
				) : (
					// post_type이 false일 때: content만 출력
					<Card className="mb-6">
						<CardContent className="p-6">
							{/* 작성자 정보 */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
										{data?.user_id === user?.id && user?.imageUrl ? (
											<Image
												src={user.imageUrl}
												alt="프로필 이미지"
												className="w-full h-full object-cover"
												width={28}
												height={28}
											/>
										) : (
											<Image
												src="/images/userImage.png"
												alt="기본 프로필 이미지"
												className="w-full h-full object-cover"
												width={28}
												height={28}
											/>
										)}
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-gray-900">
											{data?.nickname}
										</span>
										<span className="text-sm text-gray-500">
											{/* {post?.created_at.toLocaleString()} */}
											{data?.created_at &&
												new Date(data.created_at).toLocaleString('ko-KR', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
													hour12: false,
												})}
										</span>
									</div>
								</div>
								{/* 본인이 작성한 글에만 메뉴 버튼 표시 */}
								{user && user.id === data?.user_id && (
									<div>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="p-2 hover:bg-gray-100"
												>
													<MoreVertical size={16} />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-32 p-0" align="end">
												<div className="flex flex-col">
													<button
														className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
														onClick={() => {
															// 수정 기능은 나중에 구현
															toast.info('수정 기능은 준비 중입니다.');
														}}
													>
														<Edit size={14} className="text-gray-500" />
														수정하기
													</button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
																<Trash2 size={14} className="text-red-600" />
																삭제하기
															</button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>게시글 삭제</AlertDialogTitle>
																<AlertDialogDescription>
																	이 게시글을 삭제하시겠습니까?
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>취소</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => deletePost()}
																	className="bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue"
																>
																	삭제
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</PopoverContent>
										</Popover>
									</div>
								)}
							</div>

							{/* 게시글 내용 */}
							<div className="my-6">
								{data?.content.split('\n').map((line, index) => (
									<p key={index} className="text-gray-700 leading-relaxed mb-2">
										{line}
									</p>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* 댓글 섹션 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">
						댓글 {commentData?.length || 0}개
					</h3>

					{/* 댓글 입력 */}
					<div className="flex gap-2 items-center justify-center">
						<Input
							placeholder="댓글을 입력하세요"
							className="flex-1"
							value={commentContent}
							onChange={(e) => setCommentContent(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && commentContent.trim()) {
									postComments(commentContent.trim());
									setCommentContent('');
								}
							}}
						/>
						<Button
							size="sm"
							className="px-3 bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue cursor-pointer "
							onClick={() => {
								if (commentContent.trim()) {
									postComments(commentContent.trim());
									setCommentContent('');
								}
							}}
							disabled={!commentContent.trim()}
						>
							<Send size={16} />
						</Button>
					</div>

					{/* 댓글 목록 */}
					<div className="space-y-4">
						{!commentData && <div>댓글이 없습니다.</div>}
						{commentData &&
							commentData.map((comment) => (
								<Card
									key={comment.id}
									className="border-0 shadow-none bg-brand-shinhan-blue/10"
								>
									<CardContent>
										<div className="flex items-start gap-3">
											<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
												{comment.user_id === user?.id && user?.imageUrl ? (
													<Image
														src={user.imageUrl}
														alt="댓글 작성자 프로필"
														className="w-full h-full object-cover"
														width={28}
														height={28}
													/>
												) : (
													<Image
														src="/images/userImage.png"
														alt="기본 프로필 이미지"
														className="w-full h-full object-cover"
														width={28}
														height={28}
													/>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<span className="font-medium text-gray-900 text-sm">
															{comment.nickname}
														</span>
														<span className="text-xs text-gray-500">
															{comment.created_at &&
																new Date(comment.created_at).toLocaleString(
																	'ko-KR',
																	{
																		year: 'numeric',
																		month: '2-digit',
																		day: '2-digit',
																		hour: '2-digit',
																		minute: '2-digit',
																		hour12: false,
																	}
																)}
														</span>
													</div>
													{user && user.id === comment.user_id && (
														<div>
															<AlertDialog>
																<AlertDialogTrigger asChild>
																	<button className="flex items-center gap-2 cursor-pointer text-caption">
																		<Trash2 size={12} />
																	</button>
																</AlertDialogTrigger>
																<AlertDialogContent>
																	<AlertDialogHeader>
																		<AlertDialogTitle>
																			댓글 삭제
																		</AlertDialogTitle>
																		<AlertDialogDescription>
																			댓글을 삭제하시겠습니까?
																		</AlertDialogDescription>
																	</AlertDialogHeader>
																	<AlertDialogFooter>
																		<AlertDialogCancel>취소</AlertDialogCancel>
																		<AlertDialogAction
																			onClick={() =>
																				deleteComments(comment.id.toString())
																			}
																			className="bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue"
																		>
																			삭제
																		</AlertDialogAction>
																	</AlertDialogFooter>
																</AlertDialogContent>
															</AlertDialog>
														</div>
													)}
												</div>
												<p className="text-gray-700 text-sm mb-3">
													{comment.content}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GeneralPost;
