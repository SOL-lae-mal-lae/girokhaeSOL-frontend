export interface AIEvaluationResult {
	id: number;
	trade_log_id: number;
	result: string;
	links: AINewsLink[];
}

export interface AINewsLink {
	news_link: string;
	sequence: number;
}
