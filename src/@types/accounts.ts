export interface Account {
	account_id: number;
	account_number: string;
	isPrimary: boolean; // Indicates if the account is the primary account
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
