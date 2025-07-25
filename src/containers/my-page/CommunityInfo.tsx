'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query'; // Import useMutation from react-query

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchCurrentUserPosts, fetchUserComments } from '@/services/my-page';

const ITEMS_PER_PAGE = 10;

const CommunityInfoContainer = () => {
	const [postPage, setPostPage] = useState(1); // 게시글 페이지
	const [commentPage, setCommentPage] = useState(1); // 댓글 페이지

	// 게시글과 댓글을 가져오는 useMutation 훅
	const {
		data: postsData,
		isLoading: postsLoading,
		error: postsError,
	} = useQuery({
		queryKey: ['my-page-posts'],
		queryFn: fetchCurrentUserPosts,
		staleTime: 1000 * 60 * 5, // 5분 후 데이터 갱신
	});

	const {
		data: commentsData,
		isLoading: commentsLoading,
		error: commentsError,
	} = useQuery({
		queryKey: ['my-page-comments'],
		queryFn: fetchUserComments,
		staleTime: 1000 * 60 * 5, // 5분 후 데이터 갱신
	});

	// 게시글 페이지네이션 처리
	const paginatedPosts = postsData?.slice(
		(postPage - 1) * ITEMS_PER_PAGE,
		postPage * ITEMS_PER_PAGE
	);

	// 댓글 페이지네이션 처리
	const paginatedComments = commentsData?.slice(
		(commentPage - 1) * ITEMS_PER_PAGE,
		commentPage * ITEMS_PER_PAGE
	);

	const totalPostPages = Math.ceil(postsData?.length ?? 0 / ITEMS_PER_PAGE);
	const totalCommentPages = Math.ceil(
		commentsData?.length ?? 0 / ITEMS_PER_PAGE
	);

	return (
		<div>
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">활동 내역</h2>
			</div>

			{/* SHADCN Tabs */}
			<Tabs defaultValue="posts" className="w-full">
				<TabsList className="bg-brand-shinhan-blue/10">
					<TabsTrigger
						className="cursor-pointer data-[state=active]:!bg-brand-shinhan-blue data-[state=active]:!text-white hover:bg-brand-shinhan-blue/20"
						value="posts"
					>
						작성한 게시글
					</TabsTrigger>
					<TabsTrigger
						className="cursor-pointer data-[state=active]:!bg-brand-shinhan-blue data-[state=active]:!text-white hover:bg-brand-shinhan-blue/20"
						value="comments"
					>
						작성한 댓글
					</TabsTrigger>
				</TabsList>

				{/* 게시글 */}
				<TabsContent value="posts">
					<div className="flex flex-col gap-4">
						{/* 로딩 상태 */}
						{postsLoading && (
							<div className="text-center text-muted-foreground py-8">
								<LoadingSpinner text="게시글을 가져오는 중입니다..." />
							</div>
						)}

						{/* 에러 상태 */}
						{postsError && (
							<div className="text-center text-red-600 py-8">
								{postsError.message}
							</div>
						)}
						{paginatedPosts?.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								작성한 게시글이 없습니다.
							</div>
						) : (
							paginatedPosts?.map((post) => {
								return (
									<Card
										className="flex flex-row items-center justify-between p-4"
										key={post.title}
									>
										<div className="flex flex-col gap-1 flex-1">
											<CardTitle className="flex items-center gap-2">
												<span className="text-lg font-semibold">
													<p>
														{post.title}
														<Badge variant="secondary">
															{post.post_type ? '매매일지' : '일반'}
														</Badge>
													</p>
													<p
														className="text-base font-medium"
														style={{
															fontSize: '0.8em',
														}}
													>
														{post.content}
													</p>
												</span>
											</CardTitle>
											<CardContent className="flex flex-col gap-1 px-0 pb-0">
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>
														{/* Format the date correctly */}
														{new Date(post.created_at).toLocaleDateString() ||
															'날짜 없음'}
													</span>
												</div>
											</CardContent>
										</div>
									</Card>
								);
							})
						)}
					</div>

					{/* Pagination for posts */}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => setPostPage((prev) => Math.max(1, prev - 1))}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">{postPage}</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										setPostPage((prev) => Math.min(totalPostPages, prev + 1))
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</TabsContent>

				{/* 댓글 */}
				<TabsContent value="comments">
					<div className="flex flex-col gap-4">
						{/* 로딩 상태 */}
						{commentsLoading && (
							<div className="text-center text-muted-foreground py-8">
								<LoadingSpinner text="댓글을 가져오는 중입니다..." />
							</div>
						)}

						{/* 에러 상태 */}
						{commentsError && (
							<div className="text-center text-red-600 py-8">
								{commentsError.message}
							</div>
						)}
						{paginatedComments?.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								작성한 댓글이 없습니다.
							</div>
						) : (
							paginatedComments?.map((comment) => {
								// Log each comment during rendering
								console.log('Rendering Comment:', comment);
								return (
									<Card
										key={comment.id}
										className="flex flex-row items-center justify-between p-4"
									>
										<div className="flex flex-col gap-1 flex-1">
											<CardTitle className="text-base font-medium">
												{comment.content}
											</CardTitle>
											<CardContent className="flex flex-col gap-1 px-0 pb-0">
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>
														{/* Format the date correctly */}
														{new Date(comment.created_at).toLocaleDateString()}
													</span>
												</div>
											</CardContent>
										</div>
									</Card>
								);
							})
						)}
					</div>

					{/* Pagination for comments */}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										setCommentPage((prev) => Math.max(1, prev - 1))
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">{commentPage}</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										setCommentPage((prev) =>
											Math.min(totalCommentPages, prev + 1)
										)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CommunityInfoContainer;
