'use client';

import { Card } from '@/components/ui/card';

// 더미 유저 정보
const userInfo = {
	nickname: '코딩캣',
	email: 'codingcat@example.com',
	joined_at: '2023-07-15T10:00:00Z',
	activityScore: 87,
	postCount: 12,
	commentCount: 34,
};

const UserInfoContainer = () => {
	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-4 mt-8">
			<h2 className="text-2xl font-bold mb-2">내 정보</h2>
			<Card className="flex flex-row items-center justify-between p-6">
				<div className="flex flex-col gap-2">
					<div className="text-xl font-semibold">
						{userInfo.nickname}
					</div>
					<div className="text-sm text-muted-foreground">
						{userInfo.email}
					</div>
					<div className="text-sm text-muted-foreground">
						가입일: {userInfo.joined_at.slice(0, 10)}
					</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					<div className="text-sm">
						활동지수{' '}
						<span className="font-bold text-primary">
							{userInfo.activityScore}
						</span>
					</div>
					<div className="text-sm">
						게시글{' '}
						<span className="font-bold">{userInfo.postCount}</span>{' '}
						· 댓글{' '}
						<span className="font-bold">
							{userInfo.commentCount}
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default UserInfoContainer;
