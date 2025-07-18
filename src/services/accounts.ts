import {
	CreateAccountRequest,
	CreateAccountResponse,
	Account,
} from '@/@types/accounts';
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

// 계좌 생성
export const createAccount = async (
	accountData: CreateAccountRequest
): Promise<CreateAccountResponse | null> => {
	try {
		const res = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/accounts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(accountData),
		});

		if (!res.ok) {
			throw new Error('Failed to create account');
		}

		const data: CreateAccountResponse = await res.json();
		return data;
	} catch (error) {
		console.error('Error creating account:', error);
		return null;
	}
};
