export interface User {
	id: string;
	nickname: string;
	age: number;
	gender: string;
	email: string | null;
	postsCount: number;
	commentsCount: number;
	profileImage: string | null;
}

export interface UserSummary {
	journal_count_year: number;
	cumulative_investment_principal: number;
	cumulative_profit_loss: number;
	cumulative_profit_rate: number;
}
