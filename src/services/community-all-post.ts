import { CommunityPostLisst } from '@/@types/communityPost';
import { Response } from '@/@types/response';

export const getCommunityAllPost = async () => {
	try {
		// 백엔드 서버 주소로 직접 호출
		const response = await fetch('http://localhost:8000/api/v1/community', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<CommunityPostLisst> = await response.json();

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
			'http://localhost:8000/api/v1/community/general',
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

		const data: Response<CommunityPostLisst> = await response.json();

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
			'http://localhost:8000/api/v1/community/trade-log',
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

		const data: Response<CommunityPostLisst> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};
