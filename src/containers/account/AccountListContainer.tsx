'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from '@/components/ui/dialog';
import { fetchAccountList, setPrimaryAccount } from '@/services/accounts';

import AccountRegisterContainer from './AccountRegisterContainer';

interface Account {
	id: string;
	name: string;
	isPrimary: boolean;
	is_primary?: boolean; // API에서 반환되는 필드 추가
}

const AccountListContainer = () => {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [primaryAccount, setPrimaryAccountState] = useState<Account | null>(
		null
	);

	useEffect(() => {
		const loadAccounts = async () => {
			const data = await fetchAccountList();
			console.log('Fetched account data:', data); // Debugging log

			const mappedData = data?.map((account: any) => ({
				id: account.account_id.toString(),
				name: account.account_number,
				isPrimary: account.is_primary ?? false, // 수정된 부분
			}));
			console.log('Mapped account data:', mappedData); // Debugging log

			setAccounts(mappedData ?? []);

			const primary =
				mappedData?.find((account) => account.isPrimary) ?? null;
			console.log('Primary account:', primary); // Debugging log

			setPrimaryAccountState(primary);
		};
		loadAccounts();
	}, []);

	const handleSetPrimary = async (id: string) => {
		await setPrimaryAccount(id);
		setAccounts((prevAccounts) =>
			prevAccounts.map((account) =>
				account.id === id
					? { ...account, isPrimary: true }
					: { ...account, isPrimary: false }
			)
		);
	};

	return (
		<div className="p-6">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-gray-800 mb-2">
					계좌 연동
				</h1>
				<p className="text-gray-600">
					증권계좌를 연결하여 자동으로 거래내역을 가져오세요
				</p>
			</div>

			<div className="mb-6 text-center">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="bg-blue-500 text-white">
							새 계좌 추가하기
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>계좌 등록</DialogTitle>
						<AccountRegisterContainer />
					</DialogContent>
				</Dialog>
			</div>

			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-800">
					대표 계좌
				</h2>
				{primaryAccount ? (
					<p className="text-gray-600">
						대표 계좌 번호: {primaryAccount.name}
					</p>
				) : (
					<p className="text-gray-600">
						대표 계좌가 설정되지 않았습니다.
					</p>
				)}
			</div>

			<div className="space-y-4">
				{accounts.map((account) => (
					<Card
						key={account.id}
						className={`p-4 border rounded ${
							account.isPrimary ? 'bg-blue-100' : 'bg-white'
						}`}
					>
						<CardHeader>
							<CardTitle>{account.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-between items-center">
								{!account.isPrimary && (
									<Button
										onClick={() =>
											handleSetPrimary(account.id)
										}
										className="bg-blue-500 text-white"
									>
										대표 계좌로 설정
									</Button>
								)}
								{account.isPrimary && (
									<span className="text-blue-500 font-bold">
										대표 계좌
									</span>
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default AccountListContainer;
