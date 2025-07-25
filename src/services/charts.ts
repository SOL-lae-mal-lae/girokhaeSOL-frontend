import { ChartList } from '@/@types/charts';
import { Response } from '@/@types/response';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const getChartByStockCode = async (
	stockCode: string,
	baseDate: string
) => {
	const res = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/trade-logs/chart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			stk_cd: stockCode,
			base_dt: baseDate.split('-').join(''),
			upd_stkpc_tp: '1',
		}),
	});

	if (!res.ok) {
		throw new Error('Failed to fetch chart');
	}

	const data: Response<ChartList> = await res.json();
	return data.data;
};
