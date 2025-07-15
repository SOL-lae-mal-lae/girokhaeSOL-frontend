import { Response } from '@/@types/response';
import { TradeLogMonthData, TradeLogTransactionData } from '@/@types/tradeLogs';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';
import { HOUR_IN_SECOND } from '@/constants/time';

export const getMonthlyTradeLogs = async (yearMonth: string) => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs?yearMonth=${yearMonth}`,
			{
				method: 'GET',
				next: {
					revalidate: HOUR_IN_SECOND,
				},
			}
		);
		if (!res.ok) {
			throw new Error('Failed to fetch trade logs');
		}
		const data: Response<TradeLogMonthData> = await res.json();

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTransaction = async (date: string, account: string) => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/transaction?date=${date}&account=${account}`,
			{
				method: 'GET',
			}
		);
		if (!res.ok) {
			throw new Error('Failed to fetch transaction');
		}
		const data: Response<TradeLogTransactionData> = await res.json();

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
