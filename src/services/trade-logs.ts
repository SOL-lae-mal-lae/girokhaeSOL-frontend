import { AIEvaluationResult } from '@/@types/ai';
import { Response } from '@/@types/response';
import {
	TradeLog,
	TradeLogAIResult,
	TradeLogMonthData,
	TradeLogTransactionData,
} from '@/@types/tradeLogs';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';
import { HOUR_IN_SECOND } from '@/constants/time';

export const getMonthlyTradeLogs = async (yearMonth: string) => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs?year_month=${yearMonth}`,
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

export const getTransaction = async (date: string, account: number) => {
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

export const getTradeLogByDate = async (date: string) => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/detail?date=${date}`,
			{
				method: 'GET',
			}
		);
		if (!res.ok) {
			throw new Error('Failed to fetch trade log');
		}
		const data: Response<TradeLogAIResult> = await res.json();

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const createTradeLog = async (data: TradeLog) => {
	const body = JSON.stringify(data);
	try {
		const res = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		});

		if (!res.ok) {
			throw new Error('Failed to create trade log');
		}

		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getAiEvaluation = async (date: string) => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/ai?date=${date}`,
			{
				method: 'GET',
			}
		);
		if (!res.ok) {
			throw new Error('Failed to fetch ai evaluation');
		}
		const data: Response<AIEvaluationResult> = await res.json();

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
