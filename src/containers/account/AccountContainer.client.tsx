'use client';

import { useState } from 'react';

import { LockKeyhole, CreditCard, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createAccount } from '@/services/account';

interface AccountFormData {
	accountNumber: string; // 실제 계좌번호
	nickname: string; // 계좌 별명 (선택사항)
	accountType: 'personal' | 'corporate';
	appKey: string;
	securityNumber: string;
}

const AccountContainerClient = () => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<AccountFormData>({
		defaultValues: {
			accountNumber: '',
			nickname: '',
			accountType: 'personal',
			appKey: '',
			securityNumber: '',
		},
	});

	const onSubmit = async (data: AccountFormData) => {
		setIsLoading(true);
		try {
			// 계좌번호 필수 체크
			if (!data.accountNumber.trim()) {
				alert('계좌번호를 입력해주세요.');
				setIsLoading(false);
				return;
			}

			// 백엔드 API 호출
			const response = await createAccount({
				account_number: data.accountNumber,
				app_key: data.appKey,
				secret_key: data.securityNumber,
			});

			if (response) {
				alert('계좌가 성공적으로 연동되었습니다!');
				// 폼 초기화
				form.reset();
			} else {
				alert('계좌 연동에 실패했습니다. 다시 시도해주세요.');
			}
		} catch (error) {
			console.error('Account creation error:', error);
			alert('오류가 발생했습니다. 입력 정보를 확인해주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-2xl rounded-lg border bg-card text-card-foreground shadow-sm">
			<div className="space-y-6 p-6">
				<h1 className="text-2xl font-bold text-brand-shinhan-blue text-center">
					새로운 계좌 연동
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="accountNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<Building className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
										계좌번호 (필수)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="계좌번호를 입력하세요 (예: 50082-01-123456)"
											className="pl-10"
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="appKey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
										App Key
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="App Key를 입력하세요"
											className="pl-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="securityNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
										Secret Key
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="Secret Key를 입력하세요"
											className="pl-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-brand-shinhan-blue text-white"
							disabled={isLoading}
						>
							{isLoading
								? '계좌를 연동중입니다...'
								: '계좌 연동하기'}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default AccountContainerClient;
