import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export const Login = () => {
	return (
		<div className="flex justify-end items-center p-4 gap-2 h-16">
			<SignedOut>
				<SignUpButton>
					<Button className="w-[80px] bg-brand-white text-brand-black border border-gray-300 cursor-pointer hover:bg-brand-black hover:text-brand-white">
						회원가입
					</Button>
				</SignUpButton>
				<SignInButton>
					<Button className="w-[80px] bg-brand-shinhan-blue text-brand-white cursor-pointer hover:bg-brand-navy-blue">
						로그인
					</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
};
