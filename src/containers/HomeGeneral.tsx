'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { homeGeneralAnimation } from '@/lib/gsap/homeGeneralAnimation';

const HomeGeneral = () => {
	const logoRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLParagraphElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			!logoRef.current ||
			!titleRef.current ||
			!subtitleRef.current ||
			!buttonsRef.current
		)
			return;

		homeGeneralAnimation({
			logoRef,
			titleRef,
			subtitleRef,
			buttonsRef,
		});

		// 클린업 함수
		return () => {
			buttonsRef.current?.querySelectorAll('button').forEach((button) => {
				button.removeEventListener('mouseenter', () => {});
				button.removeEventListener('mouseleave', () => {});
			});
		};
	}, []);

	return (
		<>
			<div className="flex flex-col items-center gap-2">
				<div ref={logoRef}>
					<Image
						src="/images/girokhaeSOL_transparent.png"
						alt="기록해SOL"
						width={200}
						height={200}
						priority
					/>
				</div>
				<p
					ref={titleRef}
					className="text-heading1 text-brand-royal-blue text-bold"
				>
					기록해SOL에 오신 것을 환영합니다!
				</p>
				<p ref={subtitleRef} className="text-sub1 text-brand-black">
					체계적인 매매 기록과 커뮤니티로 더 나은 투자자가 되어보세요.
				</p>
			</div>
			<div ref={buttonsRef} className="flex gap-4">
				<Link href={process.env.NEXT_PUBLIC_SIGN_IN_URL as string}>
					<Button
						className="bg-brand-shinhan-blue !text-brand-white text-button hover:bg-brand-navy-blue cursor-pointer"
						size="lg"
					>
						매매일지 작성하기
					</Button>
				</Link>
				<Link href="/community">
					<Button
						className="bg-brand-white text-brand-black text-button cursor-pointer"
						variant="outline"
						size="lg"
					>
						커뮤니티 구경하기
					</Button>
				</Link>
			</div>
		</>
	);
};

export default HomeGeneral;
