// 계좌 정보 타입 정의
interface Account {
	account_number: string;
	account_id: number;
}

interface AccountListResponse {
	message: string;
	data: Account[];
}

interface CreateAccountRequest {
	account_number: string;
	app_key: string;
	secret_key: string;
}

interface CreateAccountResponse {
	message: string;
	data: Record<string, any>;
}

export type {
	Account,
	AccountListResponse,
	CreateAccountRequest,
	CreateAccountResponse,
};
