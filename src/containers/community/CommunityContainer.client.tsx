'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon, RefreshCw } from 'lucide-react';

import { StockItem } from '@/@types/stockItem';
import StockSearch from '@/components/custom/StockSearch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CommunityPostAll } from './CommunityPostAll';

const defaultStock: StockItem = {
	stock_name: '',
	stock_code: '',
};

type TabType = 'all' | 'general' | 'trade-log';

const CommunityContainer = () => {
	const queryClient = useQueryClient();
	const [popOpen, setPopOpen] = useState(false);
	const [selectedStock, setSelectedStock] = useState<StockItem>(defaultStock);
	const [selectedTab, setSelectedTab] = useState<TabType>('all');

	const handleSelectStock = (stock: StockItem) => {
		setSelectedStock(stock);
	};

	const handlePopover = (state: boolean) => {
		setPopOpen(state);
	};

	const handleRefresh = () => {
		queryClient.refetchQueries({
			queryKey: ['community-all-post', selectedTab],
			exact: true,
		});
		setSelectedStock(defaultStock);
		setPopOpen(false);
	};

	return (
		<div className="flex w-full h-full mt-8 px-8 flex-col gap-4">
			<div className="flex justify-between flex-shrink-0">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">커뮤니티</h1>
					<h2 className="text-base text-muted-foreground">
						투자 경험과 정보를 나누는 공간
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<Link href="/community/new">
						<Button variant="outline" className="rounded-full	cursor-pointer">
							<PlusIcon className="w-4 h-4" />
							글쓰기
						</Button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col gap-4 flex-1">
				<Tabs
					defaultValue={selectedTab}
					onValueChange={(value) => setSelectedTab(value as TabType)}
					className="flex-1"
				>
					<div className="flex justify-between">
						<TabsList className="bg-brand-shinhan-blue/10 rounded-lg flex justify-between">
							<TabsTrigger
								value="all"
								className="cursor-pointer data-[state=active]:!bg-brand-shinhan-blue data-[state=active]:!text-white hover:bg-brand-shinhan-blue/20"
							>
								전체
							</TabsTrigger>
							<TabsTrigger
								value="general"
								className="cursor-pointer data-[state=active]:!bg-brand-shinhan-blue data-[state=active]:!text-white hover:bg-brand-shinhan-blue/20"
							>
								일반 글
							</TabsTrigger>
							<TabsTrigger
								value="trade-log"
								className="cursor-pointer data-[state=active]:!bg-brand-shinhan-blue data-[state=active]:!text-white hover:bg-brand-shinhan-blue/20"
							>
								매매일지 공유
							</TabsTrigger>
						</TabsList>
						<div className="flex items-center gap-2">
							<Button
								onClick={handleRefresh}
								variant="outline"
								className="flex items-center gap-2 cursor-pointer"
							>
								<RefreshCw className="w-4 h-4" />
							</Button>
							<StockSearch
								popoverOpen={popOpen}
								onControlPopover={handlePopover}
								selectedStock={[selectedStock]}
								onSelectStock={handleSelectStock}
							/>
						</div>
					</div>
					<TabsContent value="all">
						<CommunityPostAll postType="all" selectedStock={selectedStock} />
					</TabsContent>
					<TabsContent value="general">
						<CommunityPostAll
							postType="general"
							selectedStock={selectedStock}
						/>
					</TabsContent>
					<TabsContent value="trade-log">
						<CommunityPostAll
							postType="trade-log"
							selectedStock={selectedStock}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default CommunityContainer;
