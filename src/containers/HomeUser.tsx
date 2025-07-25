'use client';

import { FC, useEffect, useRef } from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { format, subYears } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
	ArrowLeftRight,
	CalendarRange,
	CreditCard,
	DollarSign,
	Plus,
} from 'lucide-react';

import { InfoCard, LinkCard } from '@/components/cards';
import SummaryError from '@/components/error/Summary';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';
import { homeUserAnimation } from '@/lib/gsap/homeUserAnimation';
import { getYearSummary } from '@/services/home';

interface Props {
	userName: string;
}

const HomeUser: FC<Props> = ({ userName }) => {
	const today = new Date();
	const oneYearAgo = subYears(today, 1);

	const todayFormatted = format(today, 'yyyyMMdd', { locale: ko });
	const oneYearAgoFormatted = format(oneYearAgo, 'yyyyMMdd', { locale: ko });

	const {
		data: userSummary,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery({
		queryKey: ['userSummary'],
		queryFn: () =>
			getYearSummary({
				startDate: oneYearAgoFormatted,
				endDate: todayFormatted,
			}),
	});
	const titleRef = useRef<HTMLParagraphElement>(null);
	const infoCardsRef = useRef<HTMLUListElement>(null);
	const linkCardsRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!isSuccess) return;
		if (!titleRef.current || !infoCardsRef.current || !linkCardsRef.current)
			return;
		if (!userSummary) return;
		homeUserAnimation({
			titleRef,
			infoCardsRef,
			linkCardsRef,
		});

		// 클린업 함수
		return () => {
			document.querySelectorAll('button').forEach((button) => {
				button.removeEventListener('mouseenter', () => {});
				button.removeEventListener('mouseleave', () => {});
			});
		};
	}, [userSummary, isSuccess]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<LoadingSpinner text="사용자 정보 요약하는 중..." />
			</div>
		);
	}

	if (!userSummary) {
		return <SummaryError refetchSummary={() => refetch()} />;
	}

	return (
		<>
			<p
				ref={titleRef}
				className="text-heading1 text-brand-royal-blue text-bold opacity-0"
				style={{ visibility: 'hidden' }}
			>
				<strong className="text-brand-shinhan-blue">{userName}님</strong>의 최근
				1년 투자 현황
			</p>
			<div className="flex flex-col gap-4 w-full">
				<ul
					ref={infoCardsRef}
					className="flex gap-4 w-full opacity-0"
					style={{ visibility: 'hidden' }}
				>
					<li className="flex-1">
						<InfoCard
							description="최근 1년 거래 횟수"
							value={`${
								userSummary?.journal_count_year.toLocaleString() ?? 0
							}회`}
							icon={<ArrowLeftRight color="white" />}
							index={0}
						/>
					</li>
					<li className="flex-1">
						<InfoCard
							description="누적 손익값"
							value={`${
								userSummary?.cumulative_profit_loss.toLocaleString() ?? 0
							}원`}
							icon={<DollarSign color="white" />}
							index={1}
						/>
					</li>
					<li className="flex-1">
						<InfoCard
							description="손익률"
							value={`${userSummary?.cumulative_profit_rate.toFixed(2) ?? 0}%`}
							icon={<Plus color="white" />}
							index={2}
						/>
					</li>
				</ul>
				<ul
					ref={linkCardsRef}
					className="flex gap-4 w-full opacity-0"
					style={{ visibility: 'hidden' }}
				>
					<li className="flex-1">
						<LinkCard
							title="매매일지 관리"
							description="날짜별로 매매 기록을 체계적으로 관리하고 분석해보세요."
							icon={<CalendarRange color="white" />}
						>
							<Link href="/trade-logs">
								<Button className="bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue">
									캘린더 보기
								</Button>
							</Link>
							<Link href="/trade-logs">
								<Button className="bg-brand-sky-blue cursor-pointer">
									오늘 일지 작성
								</Button>
							</Link>
						</LinkCard>
					</li>
					<li className="flex-1">
						<LinkCard
							title="계좌 연동"
							description="증권 계좌를 연결하여 자동으로 거래 내역을 가져와보세요."
							icon={<CreditCard color="white" />}
						>
							<Link href="/account">
								<Button className="bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue">
									계좌 연동
								</Button>
							</Link>
						</LinkCard>
					</li>
				</ul>
			</div>
		</>
	);
};

export default HomeUser;

// HandCoins<ChartCandlestick />
