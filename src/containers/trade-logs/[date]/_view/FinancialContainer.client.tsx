'use client';

import { FC } from 'react';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

interface Props {
	sheetOpen: boolean;
	selectedCode: string;
	onChangeSheet: (status: boolean) => void;
}

const FinancialContainer: FC<Props> = ({
	sheetOpen,
	selectedCode,
	onChangeSheet,
}) => {
	return (
		<Sheet open={sheetOpen} onOpenChange={onChangeSheet}>
			<SheetContent className="w-[400px] sm:w-[540px]">
				<SheetHeader>
					<SheetTitle>재무제표 - {selectedCode}</SheetTitle>
				</SheetHeader>
				<div className="mt-6">
					<p className="text-muted-foreground">
						재무제표 정보가 여기에 표시됩니다.
					</p>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FinancialContainer;
