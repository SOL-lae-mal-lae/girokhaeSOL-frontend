import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';

const BRAND_COLOR = 'bg-brand-shinhan-blue text-white';

interface Account {
	id: string;
	name: string;
}

interface AccountSelectDialogProps {
	open: boolean;
	accounts: Account[];
	selected: string[];
	onChange: (selected: string[]) => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function AccountSelectDialog({
	open,
	accounts,
	selected,
	onChange,
	onConfirm,
	onCancel,
}: AccountSelectDialogProps) {
	return (
		<Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>계좌 선택</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-3 py-2">
					{accounts.map((acc) => (
						<label key={acc.id} className="flex items-center gap-2">
							<Checkbox
								checked={selected.includes(acc.id)}
								onCheckedChange={(checked) =>
									onChange(
										checked
											? [...selected, acc.id]
											: selected.filter(
													(id) => id !== acc.id
												)
									)
								}
								className={
									selected.includes(acc.id)
										? 'bg-brand-shinhan-blue border-brand-shinhan-blue text-white'
										: 'border-brand-shinhan-blue'
								}
							/>
							{acc.name}
						</label>
					))}
				</div>
				<DialogFooter className="flex gap-2 justify-end">
					<Button variant="outline" onClick={onCancel}>
						취소
					</Button>
					<Button onClick={onConfirm} className={BRAND_COLOR}>
						확인
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
