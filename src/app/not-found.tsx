'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
			<div className="text-center space-y-4">
				<h1 className="text-2xl font-bold text-brand-black">
					페이지를 찾을 수 없습니다
				</h1>
				<p className="text-muted-foreground max-w-md">
					요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. <br />
					URL을 다시 확인하거나 홈으로 돌아가서 원하는 페이지를 찾아보세요.
				</p>
			</div>
			<div className="flex gap-4">
				<Link href="/">
					<Button className="bg-brand-shinhan-blue text-brand-white hover:bg-brand-navy-blue cursor-pointer">
						홈으로 돌아가기
					</Button>
				</Link>
				<Button
					className="cursor-pointer"
					variant="outline"
					onClick={() => window.history.back()}
				>
					이전 페이지로
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
