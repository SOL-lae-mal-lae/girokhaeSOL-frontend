'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import { LockKeyhole, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { createAccount } from '@/services/accounts';

const formSchema = z.object({
	accountNumber: z.string().min(1, {
		message: '계좌번호를 입력해주세요.',
	}),
	appKey: z.string().min(1, {
		message: 'App Key를 입력해주세요.',
	}),
	securityNumber: z.string().min(1, {
		message: 'Secret Key를 입력해주세요.',
	}),
});

type AccountFormData = z.infer<typeof formSchema>;

const AccountRegisterContainerClient = () => {
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationFn: createAccount,
		onSuccess: () => {
			toast.success('계좌가 성공적으로 연동되었습니다!');
			router.push('/');
		},
		onError: () => {
			toast.error('계좌 연동에 실패했습니다.');
		},
	});

	const form = useForm<AccountFormData>({
		defaultValues: {
			accountNumber: '',
			appKey: '',
			securityNumber: '',
		},
		resolver: zodResolver(formSchema),
	});

	const encryptData = (data: string) => {
		const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // 환경 변수에서 키를 가져옵니다.
		return CryptoJS.AES.encrypt(data, encryptionKey).toString();
	};

	const onSubmit = async (data: AccountFormData) => {
		const encryptedAppKey = encryptData(data.appKey);
		const encryptedSecretKey = encryptData(data.securityNumber);

		mutate({
			account_number: data.accountNumber,
			app_key: encryptedAppKey,
			secret_key: encryptedSecretKey,
		});
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="bg-white rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-gray-800 mb-2">
						계좌 연동
					</h1>
					<p className="text-gray-600">
						키움증권 계좌를 연동하여 투자 현황을 확인해보세요.
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
											{...form.register('accountNumber', {
												required: true,
											})}
											placeholder="계좌번호를 입력하세요"
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
											{...form.register('appKey', {
												required: true,
											})}
											type="password"
											placeholder="App Key를 입력하세요"
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
											{...form.register(
												'securityNumber',
												{
													required: true,
												}
											)}
											type="password"
											placeholder="Secret Key를 입력하세요"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full bg-brand-shinhan-blue text-white cursor-pointer hover:bg-brand-navy-blue"
							disabled={isPending}
						>
							{isPending
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
