'use client';

import { FC } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { ArrowLeft, Send, Share2, User } from 'lucide-react';

import { Comment, Post } from '@/@types/posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// import { clerkClient } from '@clerk/nextjs/server';

type Props = Record<string, never>;

const GeneralPost: FC<Props> = () => {
	const router = useRouter();
	const params = useParams();
	const postId = params.postId as string;
	console.log(postId);

	// const clerk = await clerkClient();
	// const users = await clerk.users.getUser('');

	const post: Post = {
		post_type: true,
		user_id: '투자배우미',
		title: '초보 투자자를 위한 기본 용어 정리',
		content: `투자를 시작하는 분들을 위해 기본적인 용어들을 정리해보았습니다.

1. 주가수익률 (PER): Price Earnings Ratio
   • 정의: 주가를 주당순이익으로 나눈 값
   • 해석: 낮을수록 저평가, 높을수록 고평가

2. 주가순자산비율 (PBR): Price to Book Ratio
   • 정의: 주가를 주당순자산으로 나눈 값
   • 해석: 1 이하면 청산가치보다 낮은 가격

3. 배당수익률
   • 정의: 연간 배당금을 주가로 나눈 값
   • 해석: 높을수록 배당 매력도가 높음

이 정도만 알아도 기본적인 주식 분석이 가능합니다!`,
		created_at: new Date('2024-07-04 14:30'),
		trade_log_id: 1,
		is_public: true,
	};

	const comments: Comment[] = [
		{
			id: 1,
			post_id: 1,
			user_id: '초보투자자123',
			created_at: new Date('2024-07-04 14:45'),
			content: '정말 유용한 정보네요! 감사합니다 😊',
		},
		{
			id: 2,
			post_id: 1,
			user_id: '분석러버',
			created_at: new Date('2024-07-04 15:20'),
			content:
				'PER은 업종별로 다르게 봐야 한다는 점도 추가하면 좋을 것 같아요',
		},
	];

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
						{post.title}
					</h1>
				</div>
				<Button variant="ghost" size="sm" className="p-2">
					<Share2 size={20} />
				</Button>
			</div>

			{/* 게시글 내용 */}
			<div className="flex-1 p-4">
				<Card className="mb-6">
					<CardContent className="p-6">
						{/* 작성자 정보 */}
						<div className="flex items-center gap-3 mb-4">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center border border-black`}
							>
								<User size={20} className="text-black" />
							</div>
							<div className="flex flex-col">
								<span className="font-medium text-gray-900">
									{post.user_id}
								</span>
								<span className="text-sm text-gray-500">
									{post.created_at.toLocaleString()}
								</span>
							</div>
						</div>

						{/* 게시글 내용 */}
						<div className="mb-6">
							{post.content.split('\n').map((line, index) => (
								<p
									key={index}
									className="text-gray-700 leading-relaxed mb-2"
								>
									{line}
								</p>
							))}
						</div>
					</CardContent>
				</Card>

				{/* 댓글 섹션 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">
						댓글 {comments.length}개
					</h3>

					{/* 댓글 입력 */}
					<div className="flex gap-2">
						<Input
							placeholder="댓글을 입력하세요"
							className="flex-1"
						/>
						<Button
							size="sm"
							className="px-3 bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue cursor-pointer"
						>
							<Send size={16} />
						</Button>
					</div>

					{/* 댓글 목록 */}
					<div className="space-y-4">
						{comments.map((comment) => (
							<Card
								key={comment.id}
								className="border-0 shadow-none bg-brand-shinhan-blue/10"
							>
								<CardContent className="px-4 py-2">
									<div className="flex items-start gap-3">
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-black`}
										>
											<User
												size={16}
												className="text-black"
											/>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<span className="font-medium text-gray-900 text-sm">
													{comment.user_id}
												</span>
												<span className="text-xs text-gray-500">
													{comment.created_at.toLocaleString()}
												</span>
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
