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
