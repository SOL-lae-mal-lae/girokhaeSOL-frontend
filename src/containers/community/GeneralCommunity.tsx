import { MessageCircle, Share2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const GeneralCommunity = () => {
	// 임시 데이터 - 실제로는 API에서 가져올 데이터
	const posts = [
		{
			id: 1,
			title: '오늘 주식 시장 분석',
			content:
				'오늘 코스피 지수가 상승세를 보이고 있습니다. 특히 IT 섹터에서 강한 상승을 보이고 있어서 투자자들의 관심이 집중되고 있습니다. 개인적으로는 반도체 관련 주식들이 좋은 기회라고 생각합니다...',
			author: '투자왕',
			date: '2024-01-15',
			comments: 12,
			shares: 5,
		},
		{
			id: 2,
			title: 'ETF 투자 전략 공유',
			content:
				'최근 ETF 투자에 관심이 많아서 여러 전략을 연구해보고 있습니다. 특히 배당 ETF와 성장 ETF의 조합이 좋은 결과를 보이고 있어요. 리스크 분산을 위해 다양한 섹터에 투자하는 것이 중요하다고 생각합니다...',
			author: 'ETF마스터',
			date: '2024-01-14',
			comments: 8,
			shares: 3,
		},
		{
			id: 3,
			title: '재무제표 읽는 법',
			content:
				'재무제표를 제대로 읽을 수 있으면 투자 결정에 큰 도움이 됩니다. 특히 손익계산서와 재무상태표를 함께 보는 것이 중요해요. 매출 성장률, 영업이익률, 부채비율 등을 체크해보세요...',
			author: '재무분석가',
			date: '2024-01-13',
			comments: 15,
			shares: 7,
		},
		{
			id: 4,
			title: '글로벌 투자 포트폴리오',
			content:
				'국내 투자만으로는 한계가 있어서 글로벌 투자를 시작했습니다. 미국, 유럽, 아시아 등 다양한 지역에 분산 투자하고 있어요. 환율 리스크도 고려해야 하지만 장기적으로는 좋은 선택이라고 생각합니다...',
			author: '글로벌투자자',
			date: '2024-01-12',
			comments: 6,
			shares: 4,
		},
		{
			id: 5,
			title: '투자 심리학 팁',
			content:
				'투자에서 가장 중요한 것은 심리 관리입니다. FOMO나 공포에 휘둘리지 않고 원칙을 지키는 것이 핵심이에요. 손절매 기준을 미리 정해두고 감정적으로 판단하지 마세요...',
			author: '심리투자자',
			date: '2024-01-11',
			comments: 20,
			shares: 12,
		},
		{
			id: 6,
			title: '부동산 투자 vs 주식 투자',
			content:
				'부동산과 주식 투자 중 어떤 것이 더 좋을지 고민하고 있습니다. 부동산은 안정적이지만 유동성이 낮고, 주식은 변동성이 크지만 유동성이 좋아요. 개인의 상황과 목표에 따라 선택하는 것이 중요합니다...',
			author: '투자비교왕',
			date: '2024-01-10',
			comments: 18,
			shares: 9,
		},
	];

	return (
		<div className="flex flex-col gap-4 pb-8">
			{posts.map((post) => (
				<Card
					key={post.id}
					className="hover:shadow-md transition-shadow cursor-pointer"
				>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg font-semibold text-gray-900">
								{post.title}
							</CardTitle>
							<span className="text-sm text-gray-500">
								{post.date}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium text-blue-600">
								{post.author}
							</span>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="relative">
							<p className="text-gray-700 leading-relaxed mb-4">
								{post.content.length > 120
									? `${post.content.substring(0, 120)}...`
									: post.content}
							</p>

							{/* 우측 하단 아이콘들 */}
							<div className="flex items-center gap-4 justify-end">
								<div className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
									<Share2 size={16} />
								</div>
								<div className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
									<MessageCircle size={16} />
									<span className="text-sm">
										{post.comments}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
