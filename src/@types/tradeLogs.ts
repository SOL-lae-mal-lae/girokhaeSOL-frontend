import { AIEvaluationResult } from './ai';
import { InvestmentType } from './investment';
import { SentimentType } from './sentiments';

export interface TradeLogMonthData {
	dates: string[];
	total_buy_amount: number;
	total_sell_amount: number;
	total_commission_and_tax: number;
	profit_rate: number;
	sentiment: string[];
	top_buy: string[];
}

export interface TradeLogTransactionData {
	summaries: TradeLogSummary;
	trade_details: TradeLogTransaction[];
}

export interface TradeLogTransaction {
	stock_name: string;
	stock_code: string;
	avg_buy_price: number;
	buy_quantity: number;
	avg_sell_price: number;
	sell_quantity: number;
	cmsn_alm_tax: number;
	profit_amount: number;
	profit_rate: number;
}

export interface TradeLogSummary {
	total_buy_amount: number;
	total_sell_amount: number;
	total_cmsn_tax: number;
	settlement_amount: number;
	profit_rate: number;
}

export interface TradeLog {
	date: string;
	summaries: TradeLogSummary;
	trade_details: TradeLogTransaction[];
	investment_type: InvestmentType;
	sentiments: SentimentType[];
	news_links: { url: string }[];
	rationale: string;
	evaluation: string;
	charts: {
		stock_code: string;
		start_date: string;
		end_date: string;
		sequence: number;
	}[];
}

export interface TradeLogAIResult extends TradeLogWithCode {
	ai_result: AIEvaluationResult | null;
}

export interface TradeLogWithCode extends TradeLog {
	charts: {
		stock_code: string;
		stock_name: string;
		start_date: string;
		end_date: string;
		sequence: number;
	}[];
}

export interface TradeLogById {
	date: string;
	summaries: TradeLogSummary;
	trade_details: TradeLogTransaction[];
	rationale: string;
	evaluation: string;
	charts: {
		stock_name: string;
		stock_code: string;
		start_date: string;
		end_date: string;
		sequence: number;
	}[];
}
