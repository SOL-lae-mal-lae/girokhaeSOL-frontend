import { Response } from '@/@types/response';
import { UserSummary } from '@/@types/user';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const getYearSummary = async ({
	startDate,
	endDate,
}: {
	startDate: string;
	endDate: string;
}) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/home/summary?start_date=${startDate}&end_date=${endDate}`,
			{
				method: 'GET',
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch year summary');
		}

		const data: Response<UserSummary> = await response.json();

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
