import { gsap } from 'gsap';

interface Props {
	titleRef: React.RefObject<HTMLParagraphElement | null>;
	infoCardsRef: React.RefObject<HTMLUListElement | null>;
	linkCardsRef: React.RefObject<HTMLUListElement | null>;
}

export const homeUserAnimation = ({
	titleRef,
	infoCardsRef,
	linkCardsRef,
}: Props) => {
	gsap.set([titleRef.current, infoCardsRef.current, linkCardsRef.current], {
		opacity: 0,
		y: 30,
	});

	// 순차적으로 애니메이션 실행
	const tl = gsap.timeline();

	tl.to(titleRef.current, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		ease: 'power2.out',
	})
		.to(
			infoCardsRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
			},
			'-=0.3'
		)
		.to(
			linkCardsRef.current,
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
			},
			'-=0.2'
		);

	// InfoCard 내부 요소들에 스태거 애니메이션 추가
	const infoCardItems = infoCardsRef.current?.querySelectorAll('li');
	if (infoCardItems) {
		gsap.fromTo(
			infoCardItems,
			{
				opacity: 0,
				y: 20,
				scale: 0.9,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.5,
				stagger: 0.1,
				ease: 'back.out(1.7)',
				delay: 0.8,
			}
		);
	}

	// LinkCard 내부 요소들에 스태거 애니메이션 추가
	const linkCardItems = linkCardsRef.current?.querySelectorAll('li');
	if (linkCardItems) {
		gsap.fromTo(
			linkCardItems,
			{
				opacity: 0,
				y: 20,
				scale: 0.9,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.5,
				stagger: 0.15,
				ease: 'back.out(1.7)',
				delay: 1.0,
			}
		);
	}

	// 버튼에 호버 애니메이션 추가
	const buttons = document.querySelectorAll('button');
	buttons.forEach((button) => {
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
