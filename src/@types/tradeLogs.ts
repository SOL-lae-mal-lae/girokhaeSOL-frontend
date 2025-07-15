export interface TradeLogMonthData {
	dates: string[];
	total_buy_amount: number;
	total_sell_amount: number;
	total_commission_and_tax: number;
	profit_rate: number;
	sentiment: string[];
	top_buy: string[];
}
