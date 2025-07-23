'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { myComments } from '@/dummydata/comments';
import { myPosts } from '@/dummydata/posts';

const ITEMS_PER_PAGE = 10;

const CommunityInfoContainer = () => {
	const [postPage, setPostPage] = useState(1);
	const [commentPage, setCommentPage] = useState(1);

	const paginatedPosts = myPosts.slice(
		(postPage - 1) * ITEMS_PER_PAGE,
		postPage * ITEMS_PER_PAGE
	);
	const paginatedComments = myComments.slice(
		(commentPage - 1) * ITEMS_PER_PAGE,
		commentPage * ITEMS_PER_PAGE
	);

	const totalPostPages = Math.ceil(myPosts.length / ITEMS_PER_PAGE);
	const totalCommentPages = Math.ceil(myComments.length / ITEMS_PER_PAGE);

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 타이틀 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">활동 내역</h2>
			</div>

			{/* SHADCN Tabs */}
			<Tabs defaultValue="posts" className="w-full">
				<TabsList className="mb-4">
					<TabsTrigger value="posts">작성한 게시글</TabsTrigger>
					<TabsTrigger value="comments">작성한 댓글</TabsTrigger>
				</TabsList>
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
													{post.created_at.slice(
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
													{comment.created_at.slice(
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
