import Link from 'next/link';

import { SignInButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const AuthRequireContainer = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
			<div className="text-center space-y-4">
				<h1 className="text-2xl font-bold text-brand-black">
					로그인이 필요한 서비스입니다
				</h1>
				<p className="text-gray-600 max-w-md">
					이 페이지를 이용하시려면 로그인이 필요합니다. 로그인 후 다시
					시도해주세요.
				</p>
			</div>

			<div className="flex gap-4">
				<SignInButton>
					<Button className="bg-brand-shinhan-blue text-brand-white hover:bg-brand-navy-blue cursor-pointer">
						로그인하기
					</Button>
				</SignInButton>

				<Link href="/">
					<Button className="cursor-pointer" variant="outline">
						홈으로 돌아가기
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default AuthRequireContainer;
