export interface FinancialStatementData {
	stock_code: string;
	pbr: number;
	per: number;
	roe: number;
	mac: number; // 시가총액
	sale_amt: number; //매출
	bus_pro: number; //영업이익
	cup_nga: number; //당기순이익
	eps: number;
	yyyymm: string; // 년월
}
