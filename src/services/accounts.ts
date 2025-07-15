import { Account } from '@/@types/accounts';
import { Response } from '@/@types/response';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const getAccounts = async () => {
	try {
		const res = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/accounts`);

		if (!res.ok) {
			throw new Error('Failed to fetch accounts');
		}

		const data: Response<Account[]> = await res.json();
		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
