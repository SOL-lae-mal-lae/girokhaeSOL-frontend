import { FC } from 'react';

import Link from 'next/link';

import {
	ArrowLeftRight,
	CalendarRange,
	CreditCard,
	DollarSign,
	Plus,
} from 'lucide-react';

import { InfoCard, LinkCard } from '@/components/cards';
import { Button } from '@/components/ui/button';

interface Props {
	userName: string;
}

const HomeUser: FC<Props> = ({ userName }) => {
	return (
		<>
			<p className="text-heading1 text-brand-royal-blue text-bold">
				<strong className="text-brand-shinhan-blue">
					{userName}님
				</strong>
				의 최근 1년 투자 현황
			</p>
			<div className="flex flex-col gap-4 w-full">
				<ul className="flex gap-4 w-full">
					<li className="flex-1">
						<InfoCard
							description="최근 1년 거래 횟수"
							value="15"
							icon={<ArrowLeftRight color="white" />}
							bgColor="brand-sky-blue"
						/>
					</li>
					<li className="flex-1">
						<InfoCard
							description="누적 손익값"
							value="150,000,000원"
							icon={<DollarSign color="white" />}
							bgColor="brand-royal-blue"
						/>
					</li>
					<li className="flex-1">
						<InfoCard
							description="손익률"
							value="2500%"
							icon={<Plus color="white" />}
							bgColor="brand-shinhan-blue"
						/>
					</li>
				</ul>
				<ul className="flex gap-4 w-full">
					<li className="flex-1">
						<LinkCard
							title="매매일지 관리"
							description="날짜별로 매매 기록을 체계적으로 관리하고 분석해보세요."
							icon={<CalendarRange color="white" />}
							bgColor="brand-sky-blue"
						>
							<Link href="/logs">
								<Button className="bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue">
									캘린더 보기
								</Button>
							</Link>
							<Link href="/logs">
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
							bgColor="brand-royal-blue"
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
