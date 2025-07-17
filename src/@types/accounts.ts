export interface Account {
	account_id: number;
	account_number: string;
}

export interface AccountListResponse {
	message: string;
	data: Account[];
}

export interface CreateAccountRequest {
	account_number: string;
	app_key: string;
	secret_key: string;
}

export interface CreateAccountResponse {
	message: string;
	data: Record<string, any>;
}
