'use client';

import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query'; // react-query에서 useMutation 가져오기

import { Card } from '@/components/ui/card';
import { fetchCurrentUserInfo } from '@/services/my-page'; // fetchCurrentUserInfo 함수 가져오기

interface Props {
	email: string;
	profileImage: string;
}

const UserInfoContainer = ({ email, profileImage }: Props) => {
	const [userInfo, setUserInfo] = useState<any>(null); // 사용자 정보를 저장할 상태
	const [loading, setLoading] = useState(true); // 로딩 상태를 추적할 상태

	// 사용자 정보를 가져오는 useMutation 훅
	const { mutate: getUserInfo } = useMutation({
		mutationFn: fetchCurrentUserInfo, // 사용자 정보를 가져오는 함수
		onSuccess: (data) => {
			setUserInfo(data); // 요청이 성공하면 사용자 정보를 설정
			setLoading(false); // 로딩 중지
		},
	});

	// 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
	useEffect(() => {
		getUserInfo(); // 데이터를 가져오는 mutation 실행
	}, [getUserInfo]);

	if (loading) {
		return <div>로딩 중...</div>; // 데이터를 가져오는 동안 로딩 텍스트 표시
	}

	if (!userInfo) {
		return null; // userInfo가 없으면 null 반환
	}

	return (
		<div
			className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-4 mt-8 overflow-auto"
			style={{ paddingInline: '0' }}
		>
			<h2 className="text-2xl font-bold mb-2">내 정보</h2>
			<Card className="flex flex-row items-center p-6 bg-white shadow-md rounded-lg">
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
						{userInfo?.nickname}
					</div>
					<div className="text-sm text-gray-600">{email}</div>
					<div className="text-sm text-gray-600">
						성별: {userInfo?.gender}
					</div>
				</div>

				{/* Additional Stats section */}
				<div className="flex flex-col items-end gap-2">
					<div className="text-sm text-gray-800">
						나이: {userInfo?.age}세
					</div>
					<div className="text-sm text-gray-800">
						게시글 갯수:{' '}
						<span className="font-bold text-blue-600">
							{userInfo?.postsCount}
						</span>
						· 댓글{' '}
						<span className="font-bold text-blue-600">
							{userInfo?.commentsCount}
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default UserInfoContainer;
