'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDown } from 'lucide-react';

import { StockItem } from '@/@types/stockItem';
import { getStockList } from '@/services/post';

import { Button } from '../ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LoadingSpinner } from '../ui/spinner';

interface Props {
	popoverOpen: boolean;
	onControlPopover: (state: boolean) => void;
	selectedStock: StockItem[];
	onSelectStock: (stock: StockItem) => void;
}

const StockSearch = ({
	popoverOpen,
	onControlPopover,
	selectedStock,
	onSelectStock,
}: Props) => {
	const [value, setValue] = useState('');
	const { data: stockList, isLoading: isStockLoading } = useQuery({
		queryKey: ['stockList'],
		queryFn: () => getStockList(),
	});

	useEffect(() => {
		if (selectedStock.length === 0) {
			setValue('');
		}
		if (
			selectedStock.length === 1 &&
			!selectedStock[0].stock_name &&
			!selectedStock[0].stock_code
		) {
			setValue('');
		}
	}, [selectedStock]);

	if (isStockLoading) {
		return <LoadingSpinner text="종목 가져오는 중..." />;
	}

	return (
		<Popover open={popoverOpen} onOpenChange={onControlPopover}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={popoverOpen}
					className="w-[200px] flex cursor-pointer"
				>
					<span className="flex-1 truncate text-start">
						{value
							? stockList?.find((stock) => stock.stock_name === value)
									?.stock_name
							: '종목명 선택'}
					</span>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="종목명 검색" className="h-9" />
					<CommandList>
						<CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
						<CommandGroup>
							{stockList?.map((stock) => {
								return (
									<CommandItem
										key={stock.stock_code}
										value={stock.stock_name}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue);
											if (
												!selectedStock.some(
													(s) => s.stock_code === stock.stock_code
												)
											) {
												onSelectStock(stock);
											}
											onControlPopover(false);
										}}
									>
										{stock.stock_name}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default StockSearch;
