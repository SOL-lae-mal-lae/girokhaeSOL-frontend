'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { MessageCircle, Share2 } from 'lucide-react';

import { CommunityAllPost } from '@/@types/communityPost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	getCommunityGeneralPost,
	getCommunityTradeLogPost,
	getCommunityAllPost,
} from '@/services/community-all-post';

type PostType = 'all' | 'general' | 'trade-log';

interface CommunityPostAllProps {
	postType: PostType;
}

export const CommunityPostAll = ({ postType }: CommunityPostAllProps) => {
	const router = useRouter();
	const [posts, setPosts] = useState<CommunityAllPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				let data;

				switch (postType) {
					case 'all':
						data = await getCommunityAllPost();
						break;
					case 'general':
						data = await getCommunityGeneralPost();
						break;
					case 'trade-log':
						data = await getCommunityTradeLogPost();
						break;
					default:
						data = await getCommunityAllPost();
				}

				if (data) {
					setPosts(data);
				} else {
					console.log('데이터를 가져올 수 없습니다.');
				}
			} catch (error) {
				console.error('Failed to fetch posts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [postType]);

	const handleCardClick = (postId: number) => {
		router.push(`/community/${postId}`);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="text-gray-500">로딩 중...</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 pb-8">
			{posts.map((post) => (
				<Card
					key={post.id}
					className="hover:shadow-md transition-shadow cursor-pointer"
					onClick={() => handleCardClick(post.id)}
				>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg font-semibold text-gray-900">
								{post.title}
							</CardTitle>
							<span className="text-sm text-gray-500">
								{new Date(post.created_at).toLocaleDateString()}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium text-blue-600">
								{post.nickname}
							</span>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="relative">
							<p className="text-gray-700 leading-relaxed mb-4">
								{post.content.length > 120
									? `${post.content.substring(0, 120)}...`
									: post.content}
							</p>

							{/* 우측 하단 아이콘들 */}
							<div className="flex items-center gap-4 justify-end">
								<div className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
									<Share2 size={16} />
								</div>
								<div className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
									<MessageCircle size={16} />
									<span className="text-sm">
										{post.comment_count}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
