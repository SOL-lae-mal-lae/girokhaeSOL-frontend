'use client';

import { useState } from 'react';

import { Comment } from '@/@types/comment';
import { Post } from '@/@types/post';
import { Card } from '@/components/ui/card';
// importi 필요한 컴포넌트들 (Card, Tabs, etc)

// 더미 데이터
const myPosts: Post[] = [
	{
		id: 1,
		post_type: false,
		user_id: 'user1',
		created_at: '2024-01-10T12:00:00Z',
		title: '리액트 개발 팁 공유',
		content: '리액트 개발에 유용한 팁을 공유합니다.',
		trade_log_id: null,
		is_public: true,
	},
	{
		id: 2,
		post_type: false,
		user_id: 'user1',
		created_at: '2024-01-08T09:00:00Z',
		title: 'TypeScript 마이그레이션 경험담',
		content: 'TS로 마이그레이션한 경험을 공유합니다.',
		trade_log_id: null,
		is_public: true,
	},
	{
		id: 3,
		post_type: false,
		user_id: 'user1',
		created_at: '2024-01-05T15:00:00Z',
		title: 'UI/UX 디자인 트렌드 2024',
		content: '최신 UI/UX 트렌드를 소개합니다.',
		trade_log_id: null,
		is_public: true,
	},
];

const myComments: Comment[] = [
	{
		id: 1,
		post_id: 1,
		user_id: 'user1',
		content: '좋은 정보 감사합니다!',
		created_at: '2024-01-10T13:00:00Z',
	},
	{
		id: 2,
		post_id: 2,
		user_id: 'user1',
		content: 'TypeScript 정말 편하죠!',
		created_at: '2024-01-08T10:00:00Z',
	},
	{
		id: 3,
		post_id: 3,
		user_id: 'user1',
		content: '트렌드 정리 감사합니다.',
		created_at: '2024-01-05T16:00:00Z',
	},
];

const CommunityInfoContainer = () => {
	const [tab, setTab] = useState<'posts' | 'comments'>('posts');

	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 타이틀 */}
			<div className="flex flex-col gap-1 mb-2">
				<h2 className="text-2xl font-bold">활동 내역</h2>
			</div>

			{/* 탭 */}
			<div className="flex flex-row gap-2 mb-4">
				<button
					className={`px-4 py-2 rounded-t ${tab === 'posts' ? 'bg-white font-bold border-b-2 border-primary' : 'bg-muted'}`}
					onClick={() => setTab('posts')}
				>
					작성한 게시글
				</button>
				<button
					className={`px-4 py-2 rounded-t ${tab === 'comments' ? 'bg-white font-bold border-b-2 border-primary' : 'bg-muted'}`}
					onClick={() => setTab('comments')}
				>
					작성한 댓글
				</button>
			</div>

			{/* 리스트 */}
			<div className="flex flex-col gap-4">
				{tab === 'posts' ? (
					myPosts.length === 0 ? (
						<div className="text-center text-muted-foreground py-8">
							작성한 게시글이 없습니다.
						</div>
					) : (
						myPosts.map((post) => (
							<Card
								key={post.id}
								className="flex flex-row items-center justify-between p-4"
							>
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<span className="text-lg font-semibold">
											{post.title}
										</span>
										<span className="text-xs px-2 py-1 rounded bg-gray-100">
											{post.post_type
												? '매매일지'
												: '일반'}
										</span>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<span>
											{post.created_at.slice(0, 10)}
										</span>
									</div>
								</div>
								<button className="border px-4 py-2 rounded">
									상세보기
								</button>
							</Card>
						))
					)
				) : myComments.length === 0 ? (
					<div className="text-center text-muted-foreground py-8">
						작성한 댓글이 없습니다.
					</div>
				) : (
					myComments.map((comment) => (
						<Card
							key={comment.id}
							className="flex flex-row items-center justify-between p-4"
						>
							<div className="flex flex-col gap-1">
								<div className="text-base">
									{comment.content}
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<span>
										{comment.created_at.slice(0, 10)}
									</span>
								</div>
							</div>
							<button className="border px-4 py-2 rounded">
								상세보기
							</button>
						</Card>
					))
				)}
			</div>
		</div>
	);
};

export default CommunityInfoContainer;
