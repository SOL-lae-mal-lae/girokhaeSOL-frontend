'use client';

import { useQuery } from '@tanstack/react-query'; // react-query에서 useMutation 가져오기

import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { fetchCurrentUserInfo } from '@/services/my-page'; // fetchCurrentUserInfo 함수 가져오기

interface Props {
	email: string;
	profileImage: string;
}

const UserInfoContainer = ({ email, profileImage }: Props) => {
	// 사용자 정보를 가져오는 useMutation 훅
	const { data, isLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchCurrentUserInfo, // 사용자 정보를 가져오는 함수,
		staleTime: 1000 * 60 * 5, // 5분 후 데이터 갱신
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<LoadingSpinner text="유저 정보를 가져오는 중입니다..." />
			</div>
		); // 데이터를 가져오는 동안 로딩 텍스트 표시
	}

	if (!data) {
		return null; // userInfo가 없으면 null 반환
	}

	return (
		<div
			className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-4 mt-8 overflow-auto"
			style={{ paddingInline: '0' }}
		>
			<h2 className="text-2xl font-bold mb-2">내 정보</h2>
			<Card className="flex flex-row items-center justify-between p-6 bg-white shadow-md rounded-lg">
				<div>
					{/* Profile image section */}
					<div className="flex-shrink-0 mr-4">
						<img
							src={profileImage}
							alt="Profile Image"
							className="w-24 h-24 rounded-full object-cover"
						/>
					</div>

					{/* User Info section */}
					<div className="flex flex-col gap-2">
						<div className="text-xl font-semibold text-gray-800">
							{data?.nickname}
						</div>
						<div className="text-sm text-gray-600">{email}</div>
						<div className="text-sm text-gray-600">성별: {data?.gender}</div>
					</div>
				</div>

				{/* Additional Stats section */}
				<div className="flex flex-col items-end gap-2 flex-end">
					<div className="text-sm text-gray-800">나이 {data?.age}세</div>
					<div className="text-sm text-gray-800">
						게시글 갯수
						<span className="font-bold text-blue-600">{` ${data?.postsCount} `}</span>
						댓글
						<span className="font-bold text-blue-600">
							{` ${data?.commentsCount}`}
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default UserInfoContainer;
