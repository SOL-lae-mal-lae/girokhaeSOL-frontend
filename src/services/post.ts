import { CommunityPost } from '@/@types/community';
import { LogDate } from '@/@types/logDate';
import { Response } from '@/@types/response';
import { StockItem } from '@/@types/stockItem';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

// post 작성 시, 사용자 매매일지 날짜 목록 조회
export const getTradeDates = async () => {
	const response = await fetch(
		`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/recentlogs`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	if (!response.ok) {
		throw new Error('최근 매매일지 날짜 조회 실패');
	}
	const data: Response<LogDate[]> = await response.json();
	return data.data;
};

// 종목명 검색
export const getStockList = async () => {
	const response = await fetch(
		`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/search/all`
	);
	if (!response.ok) {
		throw new Error('종목명 검색 실패');
	}
	const data: Response<StockItem[]> = await response.json();
	return data.data;
};

// post 작성 시, db에 저장
export const createPost = async (data: CommunityPost) => {
	try {
		const response = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/community`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('포스팅 실패');
		}
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
