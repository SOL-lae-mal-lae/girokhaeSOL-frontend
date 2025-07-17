export interface FinancialStatementData {
	stock_code: string;
	pbr: number;
	per: number;
	debt_ratio: number; //부채비율
	revenue: bigint; //매출
	operating_income: bigint; //영업이익
	net_income: bigint; //순이익
	eps: number;
}
