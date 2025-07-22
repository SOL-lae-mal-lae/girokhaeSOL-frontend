'use client';

import { createContext, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { InvestmentType } from '@/@types/investment';
import { SentimentType } from '@/@types/sentiments';
import { Stock } from '@/@types/stocks';
import { TradeLogSummary, TradeLogTransaction } from '@/@types/tradeLogs';
import { createTradeLog } from '@/services/trade-logs';

import { useDialog } from './useDialog';

interface CreateTradeLogContext {
	date: string;
	todayTradeCompanyList: Stock[];
	summaries: TradeLogSummary;
	tradeDetail: TradeLogTransaction[];
	onSetTodayTradeCompanyList: (stocks: Stock[]) => void;
	onReorderTodayTradeCompanyList: (reorderedStocks: Stock[]) => void;
	onSetSummaries: (summaries: TradeLogSummary) => void;
	onAddTradeDetail: (tradeDetail: TradeLogTransaction[]) => void;
	investmentType: InvestmentType | null;
	onSelectInvestmentType: (investmentType: InvestmentType) => void;
	emotions: SentimentType[];
	onSelectEmotions: (emotions: SentimentType[]) => void;
	newsUrls: string[];
	onAddNewsUrl: (newsUrl: string) => void;
	onRemoveNewsUrl: (index: number) => void;
	onChangeNewsUrl: (index: number, value: string) => void;
	stockDateRange: {
		[key: string]: {
			start_date: string;
			end_date: string;
		};
	};
	onChangeDate: (code: string, date: Date) => void;
	rationalRef: React.RefObject<HTMLTextAreaElement | null> | null;
	evaluationRef: React.RefObject<HTMLTextAreaElement | null> | null;
	onSubmit: () => void;
	filterTodayTradeCompanyList: (removeCode: string) => void;
}

export const CreateTradeLogContext = createContext<CreateTradeLogContext>({
	date: '',
	onSetTodayTradeCompanyList: () => {},
	onReorderTodayTradeCompanyList: () => {},
	todayTradeCompanyList: [],
	summaries: {
		total_buy_amount: 0,
		total_sell_amount: 0,
		total_cmsn_tax: 0,
		settlement_amount: 0,
		profit_rate: 0,
	},
	tradeDetail: [],
	onSetSummaries: () => {},
	onAddTradeDetail: () => {},
	investmentType: null,
	onSelectInvestmentType: () => {},
	emotions: [],
	onSelectEmotions: () => {},
	newsUrls: [],
	onAddNewsUrl: () => {},
	onRemoveNewsUrl: () => {},
	onChangeNewsUrl: () => {},
	stockDateRange: {},
	onChangeDate: () => {},
	rationalRef: null,
	evaluationRef: null,
	onSubmit: () => {},
	filterTodayTradeCompanyList: () => {},
});

const CreateTradeLogProvider = ({
	date,
	children,
}: {
	date: string;
	children: React.ReactNode;
}) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { setDialogTitle, setDialogDescription, setDialogBody, setOpen } =
		useDialog();
	const [todayTradeCompanyList, setTodayTradeCompanyList] = useState<Stock[]>(
		[]
	);
	const [summaries, setSummaries] = useState<TradeLogSummary>({
		total_buy_amount: 0,
		total_sell_amount: 0,
		total_cmsn_tax: 0,
		settlement_amount: 0,
		profit_rate: 0,
	});
	const [tradeDetail, setTradeDetail] = useState<TradeLogTransaction[]>([]);
	const [investmentType, setInvestmentType] = useState<InvestmentType | null>(
		null
	);
	const [emotions, setEmotions] = useState<SentimentType[]>([]);
	const [newsUrls, setNewsUrls] = useState<string[]>([]);
	const [stockDateRange, setStockDateRange] = useState<{
		[key: string]: {
			start_date: string;
			end_date: string;
		};
	}>({});
	const rationalRef = useRef<HTMLTextAreaElement | null>(null);
	const evaluationRef = useRef<HTMLTextAreaElement | null>(null);

	const handleSetTodayTradeCompanyList = (stocks: Stock[]) => {
		setTodayTradeCompanyList((prev) => [...prev, ...stocks]);
	};

	const handleReorderTodayTradeCompanyList = (reorderedStocks: Stock[]) => {
		setTodayTradeCompanyList(reorderedStocks);
	};

	const handleSetSummaries = (summaries: TradeLogSummary) => {
		setSummaries((prev) => {
			return {
				total_buy_amount:
					prev.total_buy_amount + summaries.total_buy_amount,
				total_sell_amount:
					prev.total_sell_amount + summaries.total_sell_amount,
				total_cmsn_tax: prev.total_cmsn_tax + summaries.total_cmsn_tax,
				settlement_amount:
					prev.settlement_amount + summaries.settlement_amount,
				profit_rate: prev.profit_rate + summaries.profit_rate,
			};
		});
	};

	const handleAddTradeDetail = (tradeDetail: TradeLogTransaction[]) => {
		setTradeDetail((prev) => [...prev, ...tradeDetail]);
	};

	const handleSelectInvestmentType = (investmentType: InvestmentType) => {
		setInvestmentType(investmentType);
	};

	const handleSelectEmotions = (emotions: SentimentType[]) => {
		setEmotions(emotions);
	};

	const handleAddNewsUrl = (newsUrl: string) => {
		setNewsUrls((prev) => [...prev, newsUrl]);
	};

	const handleRemoveNewsUrl = (index: number) => {
		setNewsUrls((prev) => prev.filter((_, i) => i !== index));
	};

	const handleChangeUrl = (index: number, value: string) => {
		setNewsUrls((prev) =>
			prev.map((url, i) => (i === index ? value : url))
		);
	};

	const handleChangeDate = (code: string, date: Date) => {
		setStockDateRange((prev) => ({
			...prev,
			[code]: {
				...prev[code],
				start_date: format(date, 'yyyy-MM-dd'),
			},
		}));
	};

	const filterTodayTradeCompanyList = (removeCode: string) => {
		setTodayTradeCompanyList((prev) =>
			prev.filter(({ code }) => {
				return code !== removeCode;
			})
		);
	};

	const handleSubmit = async () => {
		if (!rationalRef.current || !evaluationRef.current) {
			return;
		}
		let isError = false;
		if (!investmentType) {
			setDialogBody(
				<div className="flex flex-col gap-2">
					<p>투자 유형을 선택해주세요.</p>
				</div>
			);
			isError = true;
		} else if (!emotions || emotions.length === 0) {
			setDialogBody(
				<div className="flex flex-col gap-2">
					<p>투자 심리를 선택해주세요.</p>
				</div>
			);
			isError = true;
		} else if (!rationalRef.current?.value?.trim()) {
			setDialogBody(
				<div className="flex flex-col gap-2">
					<p>투자 근거를 입력해주세요.</p>
				</div>
			);
			isError = true;
		} else if (!evaluationRef.current?.value?.trim()) {
			setDialogBody(
				<div className="flex flex-col gap-2">
					<p>투자 평가를 입력해주세요.</p>
				</div>
			);
			isError = true;
		}

		// validation 에러가 있으면 알림
		if (isError) {
			setDialogTitle('오류');
			setDialogDescription('매매일지 작성 필수값을 입력해야합니다.');
			setOpen(true);
			return;
		}

		const data = {
			date,
			summaries,
			trade_details: tradeDetail,
			investment_type: investmentType!,
			sentiments: emotions,
			charts: todayTradeCompanyList.map(({ code }, index) => ({
				stock_code: code,
				start_date: stockDateRange[code].start_date,
				end_date: stockDateRange[code].end_date,
				sequence: index + 1,
			})),
			rationale: rationalRef.current.value,
			evaluation: evaluationRef.current.value,
			news_links: newsUrls.map((url) => ({ url })),
		};

		// API 호출
		try {
			const response = await createTradeLog(data);

			if (response) {
				// 성공 처리
				queryClient.invalidateQueries({
					queryKey: ['monthlyTradeLogs'],
				});
				toast.success('매매일지 작성이 완료되었습니다.');
				router.push('/trade-logs');
			} else {
				// 실패 처리
				setDialogTitle('오류');
				setDialogDescription('매매일지 작성에 실패했습니다.');
				setDialogBody(
					<div className="flex flex-col gap-2">
						<p>
							매매일지 작성 중 오류가 발생했습니다. 다시
							시도해주세요.
						</p>
					</div>
				);
				setOpen(true);
			}
		} catch (error) {
			console.error('매매일지 작성 오류:', error);
			setDialogTitle('오류');
			setDialogDescription('매매일지 작성 중 오류가 발생했습니다.');
			setDialogBody(
				<div className="flex flex-col gap-2">
					<p>네트워크 오류가 발생했습니다. 다시 시도해주세요.</p>
				</div>
			);
			setOpen(true);
		}
	};

	useEffect(() => {
		if (!todayTradeCompanyList.length) {
			return;
		}

		todayTradeCompanyList.forEach(({ code }) => {
			const startDate = new Date(date);
			const endDate = new Date(date);
			const startDateString = format(startDate, 'yyyy-MM-dd');
			const endDateString = format(endDate, 'yyyy-MM-dd');

			setStockDateRange((prev) => ({
				...prev,
				[code]: {
					start_date: startDateString,
					end_date: endDateString,
				},
			}));
		});
	}, [todayTradeCompanyList, date]);

	return (
		<CreateTradeLogContext.Provider
			value={{
				date,
				todayTradeCompanyList,
				summaries,
				tradeDetail,
				onSetTodayTradeCompanyList: handleSetTodayTradeCompanyList,
				onReorderTodayTradeCompanyList:
					handleReorderTodayTradeCompanyList,
				onSetSummaries: handleSetSummaries,
				onAddTradeDetail: handleAddTradeDetail,
				investmentType,
				onSelectInvestmentType: handleSelectInvestmentType,
				emotions,
				onSelectEmotions: handleSelectEmotions,
				newsUrls,
				onAddNewsUrl: handleAddNewsUrl,
				onRemoveNewsUrl: handleRemoveNewsUrl,
				onChangeNewsUrl: handleChangeUrl,
				stockDateRange,
				onChangeDate: handleChangeDate,
				rationalRef,
				evaluationRef,
				onSubmit: handleSubmit,
				filterTodayTradeCompanyList,
			}}
		>
			{children}
		</CreateTradeLogContext.Provider>
	);
};

export default CreateTradeLogProvider;
