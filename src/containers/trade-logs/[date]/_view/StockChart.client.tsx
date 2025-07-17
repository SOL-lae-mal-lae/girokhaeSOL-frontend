import { FC, useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { createChart, CandlestickSeries, LineSeries } from 'lightweight-charts';

import { LoadingSpinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getChartByStockCode } from '@/services/charts';

interface Props {
	stockChartList: {
		stock_name: string;
		stock_code: string;
		start_date: string;
		end_date: string;
		sequence: number;
	}[];
}

const StockChart: FC<Props> = ({ stockChartList }) => {
	const chartContainerRef = useRef<{
		[key: string]: HTMLDivElement | null;
	}>({});
	const [selectedStockCode, setSelectedStockCode] = useState(
		stockChartList[0]
	);
	const { data, mutate, isPending, isSuccess } = useMutation({
		mutationFn: ({ code, date }: { code: string; date: string }) =>
			getChartByStockCode(code, date),
	});

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
				width: 700,
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
					timeVisible: true,
					secondsVisible: false,
				},
			}
		);
		const lineSeries5 = chart.addSeries(LineSeries, {
			color: 'green',
			lineWidth: 1,
			lastValueVisible: true,
			priceLineVisible: true, // 가격선 표시
		});
		const lineSeries20 = chart.addSeries(LineSeries, {
			color: 'red',
			lineWidth: 1,
			lastValueVisible: true,
			priceLineVisible: true,
		});
		const lineSeries60 = chart.addSeries(LineSeries, {
			color: 'orange',
			lineWidth: 1,
			lastValueVisible: true,

			priceLineVisible: true,
		});
		const lineSeries120 = chart.addSeries(LineSeries, {
			color: 'purple',
			lineWidth: 1,
			lastValueVisible: true,

			priceLineVisible: true,
		});

		const candleStickSeries = chart.addSeries(CandlestickSeries, {
			upColor: '#ef5350',
			downColor: '#2962FF',
			borderVisible: false,
		});

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

		candleStickSeries.setData(candleData);
		lineSeries5.setData(
			data
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
				.filter((item) => item.value !== '')
		);

		lineSeries20.setData(
			data
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
				.filter((item) => item.value !== '')
		);

		lineSeries60.setData(
			data
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
				.filter((item) => item.value !== '')
		);

		lineSeries120.setData(
			data
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
				.filter((item) => item.value !== '')
		);

		chart.timeScale().setVisibleRange({
			from: selectedStockCode.start_date,
			to: selectedStockCode.end_date,
		});

		// Legend 추가
		const legend = document.createElement('div');
		legend.style.position = 'absolute';
		legend.style.left = '12px';
		legend.style.top = '12px';
		legend.style.zIndex = '1';
		legend.style.fontSize = '12px';
		legend.style.fontFamily = 'Arial, sans-serif';
		legend.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
		legend.style.padding = '8px';
		legend.style.borderRadius = '4px';
		legend.style.border = '1px solid #ccc';

		legend.innerHTML = `
      <div style="margin-bottom: 4px;"><span style="color: green;">■</span> MA5</div>
      <div style="margin-bottom: 4px;"><span style="color: red;">■</span> MA20</div>
      <div style="margin-bottom: 4px;"><span style="color: orange;">■</span> MA60</div>
      <div><span style="color: purple;">■</span> MA120</div>
    `;

		chartContainerRef.current[selectedStockCode.stock_code]!.appendChild(
			legend
		);

		return () => {
			chart.remove();
			legend.remove();
		};
	}, [data, isSuccess, selectedStockCode]);

	if (isPending) {
		return (
			<div className="h-96 flex flex-col gap-2">
				<h1 className="text-heading3 font-bold">거래 기록 차트</h1>
				<div className="flex items-center justify-center flex-1">
					<LoadingSpinner text="차트를 불러오는 중..." />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-heading3 font-bold">거래 기록 차트</h1>
			<div className="h-96 rounded-lg flex items-center justify-center p-4">
				<Tabs
					defaultValue={selectedStockCode.stock_code}
					onValueChange={(value) => {
						const stockCode = stockChartList.find(
							(stock) => stock.stock_code === value
						);
						if (stockCode) {
							setSelectedStockCode(stockCode);
						}
					}}
				>
					<TabsList className="bg-brand-shinhan-blue/10">
						{stockChartList.map((stock) => (
							<TabsTrigger
								key={stock.stock_code}
								value={stock.stock_code}
								className="cursor-pointer data-[state=active]:bg-brand-shinhan-blue data-[state=active]:text-white hover:bg-brand-shinhan-blue/20"
							>
								{stock.stock_name}
							</TabsTrigger>
						))}
					</TabsList>
					{!isPending && (
						<TabsContent value={selectedStockCode.stock_code}>
							{stockChartList.map((stock) => (
								<div
									key={stock.stock_code}
									ref={(el) => {
										if (el) {
											chartContainerRef.current[
												stock.stock_code
											] = el;
										}
									}}
									className="relative"
								/>
							))}
						</TabsContent>
					)}
				</Tabs>
			</div>
		</div>
	);
};

export default StockChart;
