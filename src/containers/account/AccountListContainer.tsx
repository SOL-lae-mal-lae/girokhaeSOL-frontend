'use client';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Account } from '@/@types/accounts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDialog } from '@/hooks/useDialog';
import { changePrimaryAccount, fetchAccountList } from '@/services/accounts';

import AccountRegisterContainer from './AccountRegisterContainer';

const AccountListContainer = () => {
	const queryClient = useQueryClient();
	const [primaryAccount, setPrimaryAccount] = useState<Account | null>(null);
	const { setOpen, setDialogTitle, setDialogDescription, setDialogBody } =
		useDialog();
	const { data: accounts } = useQuery({
		queryKey: ['accounts'],
		queryFn: fetchAccountList,
	});

	const { mutate } = useMutation({
		mutationFn: changePrimaryAccount,
		onSuccess: (data) => {
			if (!data) {
				toast.error('대표 계좌 변경에 실패했습니다.');
				return;
			}
			toast.success('대표 계좌가 성공적으로 변경되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['accounts'] });
		},
	});

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleOpenDialog = () => {
		setDialogTitle('계좌 등록');
		setDialogDescription('계좌 등록 페이지입니다.');
		setDialogBody(<AccountRegisterContainer onClose={handleCloseDialog} />);
		setOpen(true);
	};

	useEffect(() => {
		if (accounts?.length) {
			const primaryAccount = accounts.find(
				(account: Account) => account.is_primary
			);

			if (!primaryAccount) {
				mutate(accounts[0].account_id.toString());
			} else {
				setPrimaryAccount(primaryAccount);
			}
		}
	}, [accounts]);

	return (
		<div className="flex w-full h-full">
			<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
				<div className="flex flex-col gap-1 mb-2">
					<h2 className="text-2xl font-bold">계좌 관리</h2>
					<div className="text-base text-muted-foreground">
						증권계좌를 연결하여 자동으로 거래내역을 가져오세요
					</div>
				</div>

				{/* 대표 계좌 섹션 */}
				{primaryAccount && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-3">
							대표 계좌
						</h3>
						<Card className="border-2 border-blue-200 bg-blue-50">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									{primaryAccount.account_number}
									<span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
										대표 계좌
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									이 계좌가 기본 조회 계좌로 설정되어 있습니다.
								</p>
							</CardContent>
						</Card>
					</div>
				)}

				{/* 계좌 목록 섹션 */}
				<div className="mb-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-gray-800">계좌 목록</h3>
						<Button
							className="bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue"
							onClick={handleOpenDialog}
						>
							새 계좌 추가
						</Button>
					</div>

					{accounts && accounts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{accounts
								.filter((account) => !account.is_primary)
								.map((account) => (
									<Card
										key={account.account_id}
										className="p-4 border hover:shadow-md transition-shadow"
									>
										<CardHeader>
											<CardTitle className="text-base">
												{account.account_number}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<Button
												className="w-full bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue"
												onClick={() => mutate(account.account_id.toString())}
											>
												대표 계좌로 설정
											</Button>
										</CardContent>
									</Card>
								))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							연결된 계좌가 없습니다. 새 계좌를 추가해보세요.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AccountListContainer;
