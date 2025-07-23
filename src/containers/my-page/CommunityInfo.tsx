'use client';

import { useState, useEffect } from 'react';

import { Comment } from '@/@types/comment';
import { Post } from '@/@types/post';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
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

	const paginatedPosts = posts.slice(
		(postPage - 1) * ITEMS_PER_PAGE,
		postPage * ITEMS_PER_PAGE
	);
	const paginatedComments = comments.slice(
		(commentPage - 1) * ITEMS_PER_PAGE,
		commentPage * ITEMS_PER_PAGE
	);

	const totalPostPages = Math.max(
		1,
		Math.ceil(posts.length / ITEMS_PER_PAGE)
	);
	const totalCommentPages = Math.max(
		1,
		Math.ceil(comments.length / ITEMS_PER_PAGE)
	);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const postResponse = await fetchCurrentUserPosts();
				if (postResponse) {
					setPosts(postResponse);
				} else {
					setPosts([]);
				}

				const commentResponse = await fetchUserComments();
				if (commentResponse) {
					setComments(commentResponse);
				} else {
					setComments([]);
				}
			} catch (err) {
				console.error('Failed to fetch data:', err);
				setError('데이터를 불러오는 데 문제가 발생했습니다.');
				setPosts([]);
				setComments([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
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
												{post.postType
													? '매매일지'
													: '일반'}
											</Badge>
										</CardTitle>
										<CardContent className="flex flex-col gap-1 px-0 pb-0">
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span>
													{post.createdAt.slice(
														0,
														10
													)}
												</span>
											</div>
										</CardContent>
									</div>
								</Card>
							))
						)}
					</div>
					{/* Pagination for posts */}
					<div className="flex justify-center mt-4">
						<button
							className="px-3 py-1 border rounded disabled:opacity-50"
							onClick={() =>
								setPostPage((p) => Math.max(1, p - 1))
							}
							disabled={postPage === 1}
						>
							이전
						</button>
						<span className="mx-2">
							{postPage} / {totalPostPages}
						</span>
						<button
							className="px-3 py-1 border rounded disabled:opacity-50"
							onClick={() =>
								setPostPage((p) =>
									Math.min(totalPostPages, p + 1)
								)
							}
							disabled={postPage === totalPostPages}
						>
							다음
						</button>
					</div>
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
													{comment.createdAt.slice(
														0,
														10
													)}
												</span>
											</div>
										</CardContent>
									</div>
								</Card>
							))
						)}
					</div>
					{/* Pagination for comments */}
					<div className="flex justify-center mt-4">
						<button
							className="px-3 py-1 border rounded disabled:opacity-50"
							onClick={() =>
								setCommentPage((p) => Math.max(1, p - 1))
							}
							disabled={commentPage === 1}
						>
							이전
						</button>
						<span className="mx-2">
							{commentPage} / {totalCommentPages}
						</span>
						<button
							className="px-3 py-1 border rounded disabled:opacity-50"
							onClick={() =>
								setCommentPage((p) =>
									Math.min(totalCommentPages, p + 1)
								)
							}
							disabled={commentPage === totalCommentPages}
						>
							다음
						</button>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CommunityInfoContainer;
