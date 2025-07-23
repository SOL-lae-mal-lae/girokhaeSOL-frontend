// 숫자 포맷 함수: 소수점 둘째자리, .0이면 정수
export function formatNumber(num: number) {
	if (typeof num !== 'number' || isNaN(num)) return '-';
	const rounded = Math.round(num * 100) / 100;
	if (Number.isInteger(rounded)) return rounded.toLocaleString();
	return rounded.toLocaleString(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
}

// 단위 정리용~
export function formatCurrency(numValue: number) {
	const isPositive = numValue > 0 ? 1 : -1;

	if (numValue * isPositive >= 10_000) {
		// 1조원 이상
		const trillion = (numValue / 10_000).toFixed(1);
		return `${trillion}조원`;
	} else if (numValue * isPositive >= 1) {
		// 1억원 이상 1조원 미만
		const billion = Math.floor(numValue);
		return `${billion}억원`;
	} else if (numValue * isPositive >= 0.0001) {
		// 1만원 이상 1억원 미만
		const tenThousand = Math.floor(numValue / 0.0001);
		return `${tenThousand}만원`;
	} else {
		// 1만원 미만
		return `${numValue.toLocaleString()}원`;
	}
}

// 이익률 계산기~
export function calculateOperatingMargin(sale_amt: number, bus_pro: number) {
	if (!sale_amt || !bus_pro || bus_pro === 0) {
		return '0.00%';
	}

	const ratio = (bus_pro / sale_amt) * 100;
	return `${ratio.toFixed(2)}%`;
}
