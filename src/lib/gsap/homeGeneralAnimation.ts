import { gsap } from 'gsap';

interface Props {
	logoRef: React.RefObject<HTMLDivElement | null>;
	titleRef: React.RefObject<HTMLParagraphElement | null>;
	subtitleRef: React.RefObject<HTMLParagraphElement | null>;
	buttonsRef: React.RefObject<HTMLDivElement | null>;
}

export const homeGeneralAnimation = ({
	logoRef,
	titleRef,
	subtitleRef,
	buttonsRef,
}: Props) => {
	gsap.set(
		[
			logoRef.current,
			titleRef.current,
			subtitleRef.current,
			buttonsRef.current,
		],
		{
			opacity: 0,
			y: 30,
		}
	);

	// 순차적으로 애니메이션 실행
	const tl = gsap.timeline();

	tl.to(logoRef.current, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		ease: 'power2.out',
	})
		.to(
			titleRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
			},
			'-=0.4'
		)
		.to(
			subtitleRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
			},
			'-=0.3'
		)
		.to(
			buttonsRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
			},
			'-=0.2'
		);

	// 버튼에 호버 애니메이션 추가
	const buttons = buttonsRef.current?.querySelectorAll('button');
	buttons?.forEach((button) => {
		button.addEventListener('mouseenter', () => {
			gsap.to(button, {
				scale: 1.05,
				duration: 0.2,
				ease: 'power2.out',
			});
		});

		button.addEventListener('mouseleave', () => {
			gsap.to(button, {
				scale: 1,
				duration: 0.2,
				ease: 'power2.out',
			});
		});
	});
};
