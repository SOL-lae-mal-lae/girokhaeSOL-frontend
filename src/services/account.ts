import {
	AccountListResponse,
	CreateAccountRequest,
	CreateAccountResponse,
} from '@/@types/account';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

// 계좌 목록 조회
export const getAccounts = async (): Promise<AccountListResponse | null> => {
	try {
		const res = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/v1/accounts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error('Failed to fetch accounts');
		}

		const data: AccountListResponse = await res.json();
		return data;
	} catch (error) {
		console.error('Error fetching accounts:', error);
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
