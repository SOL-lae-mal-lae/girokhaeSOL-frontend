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
