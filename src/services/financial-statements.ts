import { FinancialStatementData } from '@/@types/financialStatement';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const getFinancialStatements = async (
	stk_cd: string
): Promise<FinancialStatementData | null> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/financial-statements/?stock_code=${stk_cd}`
		);
		if (!res.ok) {
			return null;
		}
		const data: FinancialStatementData = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
