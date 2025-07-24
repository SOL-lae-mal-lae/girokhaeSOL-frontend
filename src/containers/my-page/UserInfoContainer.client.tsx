// Frontend/girokhaeSOL-frontend/src/containers/my-page/UserInfoContainer.client.tsx

'use client';

import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query'; // Import useMutation from react-query

import { Card } from '@/components/ui/card';
import { fetchCurrentUserInfo } from '@/services/my-page'; // Make sure this function is properly set up

interface Props {
	email: string; // Assuming we pass the email as a string
}

const UserInfoContainer = ({ email }: Props) => {
	const [userInfo, setUserInfo] = useState<any>(null); // State to store the user info
	const [loading, setLoading] = useState(true); // State to track loading status

	// useMutation hook to fetch user info
	const { mutate: getUserInfo } = useMutation({
		mutationFn: fetchCurrentUserInfo, // Function to fetch user info
		onSuccess: (data) => {
			setUserInfo(data); // Set the user info when the request is successful
			setLoading(false); // Stop loading
		},
	});

	// Fetch user data when the component mounts
	useEffect(() => {
		getUserInfo(); // Trigger the mutation to fetch user data
	}, [getUserInfo]);

	if (loading) {
		return <div>로딩 중...</div>; // Show loading text while fetching data
	}

	if (!userInfo) {
		return null; // Return null if userInfo is not available
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">내 정보</h2>
			<Card className="flex flex-row items-center justify-between p-6 bg-white shadow-md rounded-lg">
				<div className="flex flex-col gap-2">
					<div className="text-xl font-semibold text-gray-800">
						{userInfo?.nickname}
					</div>
					<div className="text-sm text-gray-600">{email}</div>
					<div className="text-sm text-gray-600">
						성별: {userInfo?.gender}
					</div>
				</div>
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
