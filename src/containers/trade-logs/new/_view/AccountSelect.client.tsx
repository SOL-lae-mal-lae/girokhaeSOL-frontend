'use client';

import { FC } from 'react';

import { Account } from '@/@types/accounts';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Props {
	accounts: Account[] | undefined | null;
	selectedAccount: number;
	onSelectAccount: (account: string) => void;
	onClickGetAccount: () => void;
}

const BRAND_COLOR = 'bg-brand-shinhan-blue text-white';

const AccountSelect: FC<Props> = ({
	accounts,
	selectedAccount,
	onSelectAccount,
	onClickGetAccount,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-heading3 font-bold">거래 기록 가져오기</h1>
			<div className="flex items-center gap-4 mb-2">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">계좌 선택:</span>
					<Select
						value={
							accounts
								?.find(
									(account) =>
										account.account_id === selectedAccount
								)
								?.account_id.toString() || ''
						}
						onValueChange={onSelectAccount}
					>
						<SelectTrigger className="w-[200px] border-brand-shinhan-blue focus:border-brand-shinhan-blue cursor-pointer">
							<SelectValue placeholder="계좌를 선택하세요" />
						</SelectTrigger>
						{accounts && (
							<SelectContent>
								{accounts.map((item) => (
									<SelectItem
										className="cursor-pointer"
										key={item.account_id}
										value={item.account_id.toString()}
									>
										{item.account_number}
									</SelectItem>
								))}
							</SelectContent>
						)}
					</Select>
				</div>
				<Button
					disabled={!selectedAccount}
					className={`${BRAND_COLOR} disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-brand-navy-blue hover:text-white`}
					onClick={onClickGetAccount}
				>
					거래 기록 가져오기
				</Button>
			</div>
		</div>
	);
};

export default AccountSelect;
