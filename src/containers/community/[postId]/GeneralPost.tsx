'use client';

import { FC, useEffect, useState } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { ArrowLeft, Send, Share2, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { CommunityPost } from '@/@types/communityPost';
import { Comment } from '@/@types/posts';
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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	deleteCommunityPost,
	getCommunityPost,
} from '@/services/community-all-post';

// import { clerkClient } from '@clerk/nextjs/server';

const GeneralPost: FC = () => {
	const router = useRouter();
	const params = useParams();
	const postId = params.postId as string;
	const [isDeleting, setIsDeleting] = useState(false);
	const { user, isLoaded } = useUser();
	const [post, setPost] = useState<CommunityPost>();
	console.log(postId);

	// const clerk = await clerkClient();
	// const users = await clerk.users.getUser('');
	useEffect(() => {
		if (!isLoaded) return; // 사용자 정보가 로드되지 않았으면 대기

		const fetchPost = async () => {
			try {
				const data = await getCommunityPost(postId);
				if (data) {
					setPost(data);
					// 디버깅 정보 출력
					// console.log('Current user:', user);
					// console.log('Post user_id:', data.user_id);
					// console.log('Is owner:', user?.id === data.user_id);
				} else {
					console.log('데이터를 가져올 수 없습니다.');
				}
			} catch (error) {
				console.error('Failed to fetch posts:', error);
			}
		};
		fetchPost();
	}, [postId, user, isLoaded]);

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

	const handleDeletePost = async () => {
		setIsDeleting(true);
		try {
			const result = await deleteCommunityPost(postId);
			if (result) {
				toast.success('게시글이 삭제되었습니다.');

				router.push('/community');
			} else {
				toast.error('게시글 삭제에 실패했습니다.');
			}
		} catch (error) {
			console.error('삭제 중 오류 발생:', error);
			toast.error('게시글 삭제 중 오류가 발생했습니다.');
		} finally {
			setIsDeleting(false);
		}
	};

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
						{post?.title}
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
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3 mb-4">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center border border-black`}
								>
									<User size={20} className="text-black" />
								</div>
								<div className="flex flex-col">
									<span className="font-medium text-gray-900">
										{post?.nickname}
									</span>
									<span className="text-sm text-gray-500">
										{/* {post?.created_at.toLocaleString()} */}
										{post?.created_at &&
											new Date(
												post.created_at
											).toLocaleString('ko-KR', {
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
							{/* 본인이 작성한 글에만 삭제 버튼 표시 */}
							{user && user.id === post?.user_id && (
								<div>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="destructive"
												size="sm"
												disabled={isDeleting}
												className="flex items-center gap-2 cursor-pointer bg-brand-shinhan-blue"
											>
												<Trash2 size={16} />
												{isDeleting
													? '삭제 중...'
													: '삭제'}
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													게시글 삭제
												</AlertDialogTitle>
												<AlertDialogDescription>
													정말로 이 게시글을
													삭제하시겠습니까?
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>
													취소
												</AlertDialogCancel>
												<AlertDialogAction
													onClick={handleDeletePost}
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

						{/* 게시글 내용 */}
						<div className="mb-6">
							{post?.content.split('\n').map((line, index) => (
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
