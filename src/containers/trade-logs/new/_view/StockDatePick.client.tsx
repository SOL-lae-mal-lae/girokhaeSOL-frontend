'use client';

import { FC } from 'react';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	rectSortingStrategy,
} from '@dnd-kit/sortable';

import StockDayPickerCard from '@/components/cards/StockDayPicker';
import HelpTooltip from '@/components/custom/HelpTooltip';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

interface Props {
	selectedAccount: number;
}

const StockDatePicker: FC<Props> = ({ selectedAccount }) => {
	const { todayTradeCompanyList, onReorderTodayTradeCompanyList } =
		useCreateTradeLog();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = todayTradeCompanyList.findIndex(
				(item) => item.code === active.id
			);
			const newIndex = todayTradeCompanyList.findIndex(
				(item) => item.code === over.id
			);

			const reorderedStocks = arrayMove(
				todayTradeCompanyList,
				oldIndex,
				newIndex
			);
			onReorderTodayTradeCompanyList(reorderedStocks);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-1">
				<h1 className="text-heading3 font-bold">거래 기록 날짜 선택</h1>
				<HelpTooltip text="순서를 지정하고 시작일을 선택하면 매매일지에 차트가 생성됩니다." />
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={todayTradeCompanyList.map((item) => item.code)}
					strategy={rectSortingStrategy}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{todayTradeCompanyList.map((stock) => (
							<StockDayPickerCard
								key={`${stock.code}-${selectedAccount}`}
								code={stock.code}
								name={stock.name}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default StockDatePicker;
