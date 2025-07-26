'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { createChart, CandlestickSeries, LineSeries } from 'lightweight-charts';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { getChartByStockCode } from '@/services/charts';

interface Props {
	stockChartList: {
		stock_name: string;
		stock_code: string;
		start_date: string;
		end_date: string;
		sequence: number;
	}[];

	chartWidth?: number;
}

const StockChart: FC<Props> = ({ stockChartList, chartWidth }) => {
	const chartContainerRef = useRef<{
		[key: string]: HTMLDivElement | null;
	}>({});
	const chartRef = useRef<{
		[key: string]: any;
	}>({});
	const seriesRef = useRef<{
		[key: string]: {
			candlestick: any;
			ma5: any;
			ma20: any;
			ma60: any;
			ma120: any;
			bollingerUpper: any;
			bollingerMiddle: any;
			bollingerLower: any;
		};
	}>({});
	const dataRef = useRef<{
		[key: string]: {
			ma5: any[];
			ma20: any[];
			ma60: any[];
			ma120: any[];
			bollingerUpper: any[];
			bollingerMiddle: any[];
			bollingerLower: any[];
		};
	}>({});
	const maRef = useRef<HTMLDivElement>(null);
	const bollingerRef = useRef<HTMLDivElement>(null);
	const ohlcRef = useRef<HTMLDivElement>(null);

	const [selectedStockCode, setSelectedStockCode] = useState(stockChartList[0]);
	const [showMA, setShowMA] = useState(true);
	const [showBollingerBands, setShowBollingerBands] = useState(false);

	const { data, mutate, isPending, isSuccess } = useMutation({
		mutationFn: ({ code, date }: { code: string; date: string }) =>
			getChartByStockCode(code, date),
	});

	// 차트 시리즈 토글 함수들
	const toggleMA = () => {
		if (!selectedStockCode || !seriesRef.current[selectedStockCode.stock_code])
			return;

		const series = seriesRef.current[selectedStockCode.stock_code];
		const data = dataRef.current[selectedStockCode.stock_code];
		const newShowMA = !showMA;
		setShowMA(newShowMA);

		if (newShowMA) {
			if (series.ma5) {
				series.ma5.setData(data.ma5 || []);
			}
			if (series.ma20) {
				series.ma20.setData(data.ma20 || []);
			}
			if (series.ma60) {
				series.ma60.setData(data.ma60 || []);
			}
			if (series.ma120) {
				series.ma120.setData(data.ma120 || []);
			}
		} else {
			if (series.ma5) {
				series.ma5.setData([]);
			}
			if (series.ma20) {
				series.ma20.setData([]);
			}
			if (series.ma60) {
				series.ma60.setData([]);
			}
			if (series.ma120) {
				series.ma120.setData([]);
			}
		}
	};

	const toggleBollingerBands = () => {
		if (!selectedStockCode || !seriesRef.current[selectedStockCode.stock_code])
			return;

		const series = seriesRef.current[selectedStockCode.stock_code];
		const data = dataRef.current[selectedStockCode.stock_code];
		const newShowBollinger = !showBollingerBands;
		setShowBollingerBands(newShowBollinger);

		if (newShowBollinger) {
			if (series.bollingerUpper) {
				series.bollingerUpper.setData(data.bollingerUpper || []);
			}
			if (series.bollingerMiddle) {
				series.bollingerMiddle.setData(data.bollingerMiddle || []);
			}
			if (series.bollingerLower) {
				series.bollingerLower.setData(data.bollingerLower || []);
			}
		} else {
			if (series.bollingerUpper) {
				series.bollingerUpper.setData([]);
			}
			if (series.bollingerMiddle) {
				series.bollingerMiddle.setData([]);
			}
			if (series.bollingerLower) {
				series.bollingerLower.setData([]);
			}
		}
	};

	useEffect(() => {
		if (!selectedStockCode) {
			return;
		}
		mutate({
			code: selectedStockCode.stock_code,
			date: selectedStockCode.end_date,
		});
	}, [selectedStockCode]);

	useEffect(() => {
		if (
			!chartContainerRef.current?.[selectedStockCode.stock_code] ||
			!data ||
			(data.length === 0 && !isSuccess)
		) {
			return;
		}

		const currentLocale = window.navigator.languages[0];
		const myPriceFormatter = Intl.NumberFormat(currentLocale, {
			style: 'currency',
			currency: 'KRW',
		}).format;

		const chart = createChart(
			chartContainerRef.current[selectedStockCode.stock_code]!,
			{
				width: chartWidth || 700,
				height: 352,
				localization: {
					priceFormatter: myPriceFormatter,
				},
				layout: {
					background: { color: '#ffffff' },
					textColor: '#333',
				},
				grid: {
					vertLines: { color: '#f0f0f0' },
					horzLines: { color: '#f0f0f0' },
				},
				rightPriceScale: {
					borderVisible: false,
					scaleMargins: {
						top: 0.1,
						bottom: 0.1,
					},
				},
				timeScale: {
					borderVisible: false,
					timeVisible: false,
					secondsVisible: false,
				},
			}
		);

		// 차트 인스턴스 저장
		chartRef.current[selectedStockCode.stock_code] = chart;

		// 시리즈들 생성 및 저장
		const lineSeries5 = chart.addSeries(LineSeries, {
			color: 'green',
			lineWidth: 1,
			lastValueVisible: false,
			priceLineVisible: false,
		});
		const lineSeries20 = chart.addSeries(LineSeries, {
			color: 'red',
			lineWidth: 1,
			lastValueVisible: false,
			priceLineVisible: false,
		});
		const lineSeries60 = chart.addSeries(LineSeries, {
			color: 'orange',
			lineWidth: 1,
			lastValueVisible: false,
			priceLineVisible: false,
		});
		const lineSeries120 = chart.addSeries(LineSeries, {
			color: 'purple',
			lineWidth: 1,
			lastValueVisible: false,
			priceLineVisible: false,
		});

		const candleStickSeries = chart.addSeries(CandlestickSeries, {
			upColor: '#ef5350',
			downColor: '#2962FF',
			borderVisible: false,
		});

		// 볼린저 밴드 시리즈들 (기본적으로 숨김)
		const bollingerUpper = chart.addSeries(LineSeries, {
			color: 'rgb(255, 195, 66)',
			lineWidth: 1,
			lastValueVisible: false,
		});
		const bollingerMiddle = chart.addSeries(LineSeries, {
			color: 'rgb(3, 178, 108)',
			lineWidth: 1,
			lastValueVisible: false,
		});
		const bollingerLower = chart.addSeries(LineSeries, {
			color: 'rgb(255, 195, 66)',
			lineWidth: 1,
			lastValueVisible: false,
		});

		// 시리즈들 저장
		seriesRef.current[selectedStockCode.stock_code] = {
			candlestick: candleStickSeries,
			ma5: lineSeries5,
			ma20: lineSeries20,
			ma60: lineSeries60,
			ma120: lineSeries120,
			bollingerUpper,
			bollingerMiddle,
			bollingerLower,
		};

		const candleData = data.map((item) => ({
			time:
				item.dt.substring(0, 4) +
				'-' +
				item.dt.substring(4, 6) +
				'-' +
				item.dt.substring(6, 8),
			open: Number(item.open_price),
			high: Number(item.high_price),
			low: Number(item.low_price),
			close: Number(item.current_price),
		}));

		const ma5Data = data
			.map((item) => {
				return {
					time:
						item.dt.substring(0, 4) +
						'-' +
						item.dt.substring(4, 6) +
						'-' +
						item.dt.substring(6, 8),
					value: item.ma_5 ? Number(item.ma_5) : '',
				};
			})
			.filter((item) => item.value !== '');

		const ma20Data = data
			.map((item) => {
				return {
					time:
						item.dt.substring(0, 4) +
						'-' +
						item.dt.substring(4, 6) +
						'-' +
						item.dt.substring(6, 8),
					value: item.ma_20 ? Number(item.ma_20) : '',
				};
			})
			.filter((item) => item.value !== '');

		const ma60Data = data
			.map((item) => {
				return {
					time:
						item.dt.substring(0, 4) +
						'-' +
						item.dt.substring(4, 6) +
						'-' +
						item.dt.substring(6, 8),
					value: item.ma_60 ? Number(item.ma_60) : '',
				};
			})
			.filter((item) => item.value !== '');

		const ma120Data = data
			.map((item) => {
				return {
					time:
						item.dt.substring(0, 4) +
						'-' +
						item.dt.substring(4, 6) +
						'-' +
						item.dt.substring(6, 8),
					value: item.ma_120 || '',
				};
			})
			.filter((item) => item.value !== '');

		// 데이터 설정 및 저장
		candleStickSeries.setData(candleData);
		lineSeries5.setData(showMA ? ma5Data : []);
		lineSeries20.setData(showMA ? ma20Data : []);
		lineSeries60.setData(showMA ? ma60Data : []);
		lineSeries120.setData(showMA ? ma120Data : []);

		// 데이터를 시리즈에 저장 (토글용)
		dataRef.current[selectedStockCode.stock_code] = {
			ma5: ma5Data,
			ma20: ma20Data,
			ma60: ma60Data,
			ma120: ma120Data,
			bollingerUpper: [],
			bollingerMiddle: [],
			bollingerLower: [],
		};

		const bollingerData = data
			.map((item) => {
				if (item.middle_band && item.upper_band && item.lower_band) {
					const middle = Number(item.middle_band);
					const upper = Number(item.upper_band);
					const lower = Number(item.lower_band);
					return {
						time:
							item.dt.substring(0, 4) +
							'-' +
							item.dt.substring(4, 6) +
							'-' +
							item.dt.substring(6, 8),
						upper,
						middle,
						lower,
					};
				}
				return null;
			})
			.filter((item) => item) as {
			time: string;
			upper: number;
			middle: number;
			lower: number;
		}[];

		bollingerUpper.setData(
			showBollingerBands
				? bollingerData.map((d) => ({ time: d.time, value: d.upper }))
				: []
		);
		bollingerMiddle.setData(
			showBollingerBands
				? bollingerData.map((d) => ({ time: d.time, value: d.middle }))
				: []
		);
		bollingerLower.setData(
			showBollingerBands
				? bollingerData.map((d) => ({ time: d.time, value: d.lower }))
				: []
		);

		// 볼린저 밴드 데이터 저장
		dataRef.current[selectedStockCode.stock_code].bollingerUpper =
			bollingerData.map((d) => ({
				time: d.time,
				value: d.upper,
			}));
		dataRef.current[selectedStockCode.stock_code].bollingerMiddle =
			bollingerData.map((d) => ({
				time: d.time,
				value: d.middle,
			}));
		dataRef.current[selectedStockCode.stock_code].bollingerLower =
			bollingerData.map((d) => ({
				time: d.time,
				value: d.lower,
			}));

		chart.timeScale().setVisibleRange({
			from: selectedStockCode.start_date,
			to: selectedStockCode.end_date,
		});

		// 마우스 이동에 따른 값 업데이트 함수
		const updateValues = (param: any) => {
			if (
				param.point === undefined ||
				!param.time ||
				param.point.x < 0 ||
				param.point.x >
					chartContainerRef.current[selectedStockCode.stock_code]!
						.clientWidth ||
				param.point.y < 0 ||
				param.point.y >
					chartContainerRef.current[selectedStockCode.stock_code]!.clientHeight
			) {
				// 차트 영역을 벗어나면 기본값으로 초기화
				if (ohlcRef.current) {
					ohlcRef.current.innerHTML = '시가: - 고가: - 저가: - 종가: -';
				}
				if (maRef.current) {
					maRef.current.innerHTML =
						'이동평균선 <span style="color: green;">5:</span> - <span style="color: red;">20:</span> - <span style="color: orange;">60:</span> - <span style="color: purple;">120:</span> -';
				}
				if (bollingerRef.current) {
					bollingerRef.current.innerHTML =
						'<span style="color: rgb(3, 178, 108);">중심선:</span> - <span style="color: rgb(255, 195, 66);">상한선:</span> - <span style="color: rgb(255, 195, 66);">하한선:</span> -';
				}
				return;
			}

			// 캔들스틱 데이터
			const candleData = param.seriesData.get(candleStickSeries);

			// 이동평균선 데이터들
			const ma5Data = showMA ? param.seriesData.get(lineSeries5) : null;
			const ma20Data = showMA ? param.seriesData.get(lineSeries20) : null;
			const ma60Data = showMA ? param.seriesData.get(lineSeries60) : null;
			const ma120Data = showMA ? param.seriesData.get(lineSeries120) : null;

			// 볼린저 밴드 데이터들
			const bollingerUpperData = showBollingerBands
				? param.seriesData.get(bollingerUpper)
				: null;
			const bollingerMiddleData = showBollingerBands
				? param.seriesData.get(bollingerMiddle)
				: null;
			const bollingerLowerData = showBollingerBands
				? param.seriesData.get(bollingerLower)
				: null;

			// 가격 포맷팅 함수
			const formatPrice = (price: number | undefined) => {
				if (price === undefined || price === null) return '-';
				return `${Math.round(price).toLocaleString('ko-KR')}원`;
			};

			// OHLC 영역 업데이트
			if (ohlcRef.current && candleData) {
				const open = formatPrice(candleData.open);
				const high = formatPrice(candleData.high);
				const low = formatPrice(candleData.low);
				const close = formatPrice(candleData.close);

				ohlcRef.current.innerHTML = `시가: ${open} 고가: ${high} 저가: ${low} 종가: ${close}`;
			}

			// 이동평균선 영역 업데이트
			if (maRef.current) {
				const ma5 = formatPrice(ma5Data?.value);
				const ma20 = formatPrice(ma20Data?.value);
				const ma60 = formatPrice(ma60Data?.value);
				const ma120 = formatPrice(ma120Data?.value);

				maRef.current.innerHTML = `이동평균선 <span style="color: green;">5:</span> ${ma5} <span style="color: red;">20:</span> ${ma20} <span style="color: orange;">60:</span> ${ma60} <span style="color: purple;">120:</span> ${ma120}`;
			}

			// 볼린저 밴드 영역 업데이트
			if (bollingerRef.current) {
				const upper = formatPrice(bollingerUpperData?.value);
				const middle = formatPrice(bollingerMiddleData?.value);
				const lower = formatPrice(bollingerLowerData?.value);

				bollingerRef.current.innerHTML = `<span style="color: rgb(3, 178, 108);">중심선:</span> ${middle} <span style="color: rgb(255, 195, 66);">상한선:</span> ${upper} <span style="color: rgb(255, 195, 66);">하한선:</span> ${lower}`;
			}
		};

		// 크로스헤어 이벤트 구독
		chart.subscribeCrosshairMove(updateValues);

		return () => {
			chart.remove();
		};
	}, [data, isSuccess, selectedStockCode, showMA, showBollingerBands]);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-heading3 font-bold">거래 기록 차트</h1>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<Select
						value={selectedStockCode.stock_code}
						onValueChange={(value) => {
							const stockCode = stockChartList.find(
								(stock) => stock.stock_code === value
							);
							if (stockCode) {
								setSelectedStockCode(stockCode);
							}
						}}
					>
						<SelectTrigger className="w-[200px] cursor-pointer">
							<SelectValue placeholder="주식 선택" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>주식 종목</SelectLabel>
								{stockChartList.map((stock) => (
									<SelectItem
										key={stock.stock_code}
										value={stock.stock_code}
										className="cursor-pointer"
									>
										{stock.stock_name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<label htmlFor="ma-switch" className="text-sm">
								이동평균선
							</label>
							<Switch
								id="ma-switch"
								checked={showMA}
								onCheckedChange={toggleMA}
								className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
							/>
						</div>
						<div className="flex items-center gap-2">
							<label htmlFor="bollinger-switch" className="text-sm">
								볼린저밴드
							</label>
							<Switch
								id="bollinger-switch"
								checked={showBollingerBands}
								onCheckedChange={toggleBollingerBands}
								className="data-[state=checked]:bg-brand-shinhan-blue data-[state=unchecked]:!bg-gray [&>span]:!bg-white cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="h-96 rounded-lg flex flex-col gap-4 p-4 relative">
				<div className="absolute flex flex-col gap-1 w-full text-[11px] top-4 left-4 z-20">
					<div ref={ohlcRef}>
						시가: - <span style={{ color: '#333' }}>고가: -</span>{' '}
						<span style={{ color: '#333' }}>저가: -</span>{' '}
						<span style={{ color: '#333' }}>종가: -</span>
					</div>
					{showMA && (
						<div ref={maRef}>
							이동평균선 <span style={{ color: 'green' }}>5: -</span>{' '}
							<span style={{ color: 'red' }}>20: -</span>{' '}
							<span style={{ color: 'orange' }}>60: -</span>{' '}
							<span style={{ color: 'purple' }}>120: -</span>
						</div>
					)}
					{showBollingerBands && (
						<div ref={bollingerRef}>
							<span style={{ color: 'rgb(3, 178, 108)' }}>중심선: -</span>{' '}
							<span style={{ color: 'rgb(255, 195, 66)' }}>상한선: -</span>{' '}
							<span style={{ color: 'rgb(255, 195, 66)' }}>하한선: -</span>
						</div>
					)}
				</div>
				{!isPending && (
					<div className="flex-1">
						{stockChartList.map((stock) => (
							<div
								key={stock.stock_code}
								ref={(el) => {
									if (el) {
										chartContainerRef.current[stock.stock_code] = el;
									}
								}}
								className={`relative ${stock.stock_code === selectedStockCode.stock_code ? 'block' : 'hidden'}`}
							/>
						))}
					</div>
				)}
				{isPending && (
					<div className="h-96 flex flex-col gap-2">
						<div className="flex items-center justify-center flex-1">
							<LoadingSpinner text="차트를 불러오는 중..." />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StockChart;
