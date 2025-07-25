import { CommunityPost, CommunityPostList } from '@/@types/communityPost';
import { Response } from '@/@types/response';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const getCommunityAllPost = async () => {
	try {
		// 백엔드 서버 주소로 직접 호출
		const response = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/community`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<CommunityPostList> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const getCommunityGeneralPost = async () => {
	try {
		// 백엔드 서버 주소로 직접 호출
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/general`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<CommunityPostList> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const getCommunityTradeLogPost = async () => {
	try {
		// 백엔드 서버 주소로 직접 호출
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/trade-log`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<CommunityPostList> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const getCommunityPost = async (postId: string) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<CommunityPost> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const deleteCommunityPost = async (postId: string) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<{ message: string }> = await response.json();

		return data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};
