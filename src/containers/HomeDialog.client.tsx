'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useDialog } from '@/hooks/useDialog';
import { fetchClientData } from '@/services/fetchClientData';

const formSchema = z.object({
	age: z.number().min(1).max(100),
	gender: z.enum(['male', 'female']),
});

type FormSchema = z.infer<typeof formSchema>;

const HomeDialogClient = () => {
	const router = useRouter();
	const { setOpen, setDialogTitle, setDialogDescription, setDialogBody } =
		useDialog();
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			age: 0,
			gender: 'male',
		},
	});

	const onSubmit = async (data: FormSchema) => {
		const res = await fetchClientData('/users', {
			method: 'POST',
			body: JSON.stringify({
				age: data.age,
				gender: data.gender,
			}),
		});

		if (res?.data) {
			setOpen(false);
			router.push('/');
		}
	};

	useEffect(() => {
		setDialogTitle('정보 입력');
		setDialogDescription(
			'정확한 데이터랩 정보 제공을 위해 나이와 성별 정보가 필요합니다.'
		);
		setDialogBody(
			<Form {...form}>
				<form
					className="flex flex-col gap-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel>나이</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>성별</FormLabel>
								<FormControl>
									<RadioGroup
										className="flex gap-4"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<div className="flex items-center gap-2">
											<RadioGroupItem
												value="male"
												id="male"
											></RadioGroupItem>
											<Label
												className="font-normal"
												htmlFor="male"
											>
												남성
											</Label>
										</div>
										<div className="flex items-center gap-2">
											<RadioGroupItem
												id="female"
												value="female"
											></RadioGroupItem>
											<Label
												className="font-normal"
												htmlFor="female"
											>
												여성
											</Label>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full" type="submit">
						제출
					</Button>
				</form>
			</Form>
		);
		setOpen(true);
	}, []);

	return null;
};

export default HomeDialogClient;
