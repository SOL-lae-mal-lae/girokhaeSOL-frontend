'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { fetchAccountList, setPrimaryAccount } from '@/services/accounts';
// import { Typography } from '@/components/ui/typography';

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
	const [showRegister, setShowRegister] = useState(false);

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
			<p>보유 계좌</p>
			<div className="mb-6">
				<h2 className="text-xl font-semibold text-gray-800">
					대표 계좌
				</h2>
				{primaryAccount ? (
					<p className="text-gray-600">
						대표 계좌: {primaryAccount.name}
					</p>
				) : (
					<p className="text-gray-600">
						대표 계좌가 설정되지 않았습니다.
					</p>
				)}
			</div>
			<ul className="space-y-4">
				{accounts.map((account) => (
					<li
						key={account.id}
						className={`p-4 border rounded ${
							account.isPrimary ? 'bg-blue-100' : 'bg-white'
						}`}
					>
						<div className="flex justify-between items-center">
							<span>{account.name}</span>
							{!account.isPrimary && (
								<Button
									onClick={() => handleSetPrimary(account.id)}
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
					</li>
				))}
			</ul>
			<Button
				onClick={() => setShowRegister(true)}
				className="mt-6 bg-green-500 text-white"
			>
				새 계좌 등록하기
			</Button>
			{showRegister && <AccountRegisterContainer />}
		</div>
	);
};

export default AccountListContainer;
