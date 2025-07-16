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

const AccountRegisterContainerClient = () => {
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

			// API 키 필수 체크
			if (!data.appKey.trim()) {
				alert('App Key를 입력해주세요.');
				setIsLoading(false);
				return;
			}

			// Secret Key 필수 체크
			if (!data.securityNumber.trim()) {
				alert('Secret Key를 입력해주세요.');
				setIsLoading(false);
				return;
			}

			const result = await createAccount({
				account_number: data.accountNumber,
				app_key: data.appKey,
				secret_key: data.securityNumber,
			});

			if (result) {
				alert('계좌가 성공적으로 연동되었습니다!');
				form.reset();
			} else {
				alert('계좌 연동에 실패했습니다.');
			}
		} catch (error) {
			console.error('계좌 연동 오류:', error);
			alert('계좌 연동 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="bg-white rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-gray-800 mb-2">
						계좌 연동
					</h1>
					<p className="text-gray-600">
						키움증권 계좌를 연동하여 투자 현황을 확인해보세요
					</p>
				</div>

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
									<FormLabel className="flex items-center gap-2">
										<CreditCard className="w-4 h-4" />
										계좌번호
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="계좌번호를 입력하세요"
											className="pl-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="nickname"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<Building className="w-4 h-4" />
										계좌 별명 (선택사항)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="계좌 별명을 입력하세요"
											className="pl-10"
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
									<FormLabel className="flex items-center gap-2">
										<LockKeyhole className="w-4 h-4" />
										App Key
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
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
									<FormLabel className="flex items-center gap-2">
										<LockKeyhole className="w-4 h-4" />
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

export default AccountRegisterContainerClient;
