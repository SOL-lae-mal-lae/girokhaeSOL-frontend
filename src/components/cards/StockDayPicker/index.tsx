import { FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';

import DatePicker from '@/components/custom/DatePicker';
import { useCreateTradeLog } from '@/hooks/useCreateTradeLog';

interface Props {
	code: string;
	name: string;
}

const StockDayPickerCard: FC<Props> = ({ code, name }) => {
	const { filterTodayTradeCompanyList } = useCreateTradeLog();
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: code });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="relative p-4 border rounded-lg hover:shadow-md transition-shadow flex flex-col h-full"
		>
			<div
				className="absolute top-[13px] left-[-8px] flex-shrink-0 cursor-grab active:cursor-grabbing p-1 rounded"
				{...attributes}
				{...listeners}
			>
				<GripVertical className="text-gray-400" size={16} />
			</div>
			<div className="flex items-start gap-3 mb-3 flex-1">
				{/* 드래그 핸들 */}

				{/* 종목 정보 */}
				<div className="flex items-start justify-between flex-1">
					<div className="flex flex-col gap-0.5">
						<span className="font-semibold text-sm leading-tight line-clamp-2 flex-1 mr-2">
							{name}
						</span>
						<span className="text-xs text-gray-500 flex-shrink-0">
							{code}
						</span>
					</div>
					<X
						size={16}
						onClick={() => filterTodayTradeCompanyList(code)}
						className="text-gray-400 hover:text-red-500 cursor-pointer"
					/>
				</div>
			</div>
			<div className="mt-auto">
				<DatePicker id={code} label="시작일" />
			</div>
		</div>
	);
};

export default StockDayPickerCard;
