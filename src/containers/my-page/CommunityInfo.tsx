// Frontend/girokhaeSOL-frontend/src/containers/my-page/CommunityInfo.tsx

'use client';

import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query'; // Import useMutation from react-query

import { Comment } from '@/@types/comment';
import { Post } from '@/@types/post';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchCurrentUserPosts, fetchUserComments } from '@/services/my-page';

const ITEMS_PER_PAGE = 10;

const CommunityInfoContainer = () => {
	const [posts, setPosts] = useState<Post[]>([]); // 게시글 상태
	const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
	const [postPage, setPostPage] = useState(1); // 게시글 페이지
	const [commentPage, setCommentPage] = useState(1); // 댓글 페이지
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState<string | null>(null); // 에러 상태

	// Mutation hooks for fetching posts and comments
	const { mutate: getPosts } = useMutation({
		mutationFn: fetchCurrentUserPosts,
		onSuccess: (data) => {
			if (data) setPosts(data);
			setLoading(false);
		},
		onError: () => {
			setError('데이터를 불러오는 데 문제가 발생했습니다.');
			setLoading(false);
		},
	});

	const { mutate: getComments } = useMutation({
		mutationFn: fetchUserComments,
		onSuccess: (data) => {
			if (data) setComments(data);
			setLoading(false);
		},
		onError: () => {
			setError('데이터를 불러오는 데 문제가 발생했습니다.');
			setLoading(false);
		},
	});

	useEffect(() => {
		setLoading(true);
		setError(null);

		// Fetch data using mutate instead of useEffect directly
		getPosts();
		getComments();
	}, [getPosts, getComments]);

	// 게시글 페이지네이션 처리
	const paginatedPosts = posts.slice(
		(postPage - 1) * ITEMS_PER_PAGE,
		postPage * ITEMS_PER_PAGE
	);

	// 댓글 페이지네이션 처리
	const paginatedComments = comments.slice(
		(commentPage - 1) * ITEMS_PER_PAGE,
		commentPage * ITEMS_PER_PAGE
	);

	const totalPostPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
	const totalCommentPages = Math.ceil(comments.length / ITEMS_PER_PAGE);

	return (
		<div>
			{/* 타이틀 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">활동 내역</h2>
			</div>

			{/* 로딩 상태 */}
			{loading && (
				<div className="text-center text-muted-foreground py-8">
					로딩 중...
				</div>
			)}

			{/* 에러 상태 */}
			{error && (
				<div className="text-center text-red-600 py-8">{error}</div>
			)}

			{/* SHADCN Tabs */}
			<Tabs defaultValue="posts" className="w-full">
				<TabsList className="mb-4">
					<TabsTrigger value="posts">작성한 게시글</TabsTrigger>
					<TabsTrigger value="comments">작성한 댓글</TabsTrigger>
				</TabsList>

				{/* 게시글 */}
				<TabsContent value="posts">
					<div className="flex flex-col gap-4">
						{paginatedPosts.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								작성한 게시글이 없습니다.
							</div>
						) : (
							paginatedPosts.map((post) => (
								<Card
									key={post.id}
									className="flex flex-row items-center justify-between p-4"
								>
									<div className="flex flex-col gap-1 flex-1">
										<CardTitle className="flex items-center gap-2">
											<span className="text-lg font-semibold">
												{post.title}
											</span>
											<Badge variant="secondary">
												{post.post_type
													? '매매일지'
													: '일반'}
											</Badge>
										</CardTitle>
										<CardContent className="flex flex-col gap-1 px-0 pb-0">
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span>
													{post.created_at ||
														'날짜 없음'}
												</span>
											</div>
										</CardContent>
									</div>
								</Card>
							))
						)}
					</div>

					{/* Pagination for posts */}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										setPostPage((prev) =>
											Math.max(1, prev - 1)
										)
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">
									{postPage}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										setPostPage((prev) =>
											Math.min(totalPostPages, prev + 1)
										)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</TabsContent>

				{/* 댓글 */}
				<TabsContent value="comments">
					<div className="flex flex-col gap-4">
						{paginatedComments.length === 0 ? (
							<div className="text-center text-muted-foreground py-8">
								작성한 댓글이 없습니다.
							</div>
						) : (
							paginatedComments.map((comment) => (
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
													{comment.created_at}
												</span>
											</div>
										</CardContent>
									</div>
								</Card>
							))
						)}
					</div>

					{/* Pagination for comments */}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										setCommentPage((prev) =>
											Math.max(1, prev - 1)
										)
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">
									{commentPage}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										setCommentPage((prev) =>
											Math.min(
												totalCommentPages,
												prev + 1
											)
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
