'use client';

import { FC } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { ArrowLeft, Send, Share2, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/ui/spinner';

const GeneralPost: FC = () => {
	const router = useRouter();
	const params = useParams();
	const postId = params.postId as string;
	const { user } = useUser();
	const { data, isLoading } = useQuery({
		queryKey: ['community-post', postId],
		queryFn: () => getCommunityPost(postId),
	});

	const { mutate: deletePost, isPending: isDeleting } = useMutation({
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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<LoadingSpinner text="게시글 불러오는 중..." />;
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
										{data?.nickname}
									</span>
									<span className="text-sm text-gray-500">
										{/* {post?.created_at.toLocaleString()} */}
										{data?.created_at &&
											new Date(
												data.created_at
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
							{user && user.id === data?.user_id && (
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
													onClick={() => deletePost()}
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
							{data?.content.split('\n').map((line, index) => (
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
