export interface ChartData {
	open_price: string;
	high_price: string;
	low_price: string;
	current_price: string;
	dt: string;
	ma_5: string;
	ma_20: string;
	ma_60: string;
	ma_120: string;
	middle_band: string;
	upper_band: string;
	lower_band: string;
}

export type ChartList = ChartData[];
