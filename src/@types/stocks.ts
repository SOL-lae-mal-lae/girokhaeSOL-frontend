export interface Stock {
	code: string;
	name: string;
}

export interface StockWithDisplay extends Stock {
	display: boolean;
}
