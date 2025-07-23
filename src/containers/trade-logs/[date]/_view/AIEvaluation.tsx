'use client';

import { FC } from 'react';

import Link from 'next/link';

import { AIEvaluationResult } from '@/@types/ai';
import { MarkdownViewer } from '@/components/common/MarkdownViewer';
import ScoreChart from '@/components/custom/ScoreChart';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
	SheetDescription,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

interface Props {
	result: AIEvaluationResult;
	isOpen: boolean;
	onChangeOpen: (status: boolean) => void;
}

const AIEvaluation: FC<Props> = ({ result, isOpen, onChangeOpen }) => {
	const splittedResult = result.result.split('@');
	const handleChangeOpen = () => {
		if (isOpen) {
			onChangeOpen(false);
		} else {
			onChangeOpen(true);
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={handleChangeOpen}>
			<SheetContent className="!w-[40vw] flex flex-col !max-w-none pl-3 pr-3">
				<SheetHeader>
					<SheetTitle>AI 매매 분석 리포트</SheetTitle>
					<SheetDescription>
						매매 습관을 개선하고 성공적인 투자를 돕습니다.
					</SheetDescription>
				</SheetHeader>
				<div className="h-[250px]">
					<ScoreChart
						scores={[
							Number(splittedResult[0]),
							Number(splittedResult[1]),
							Number(splittedResult[2]),
						]}
					/>
				</div>
				<div className="overflow-y-auto p-4">
					<Accordion type="multiple" defaultValue={['item-0']}>
						{splittedResult[3]
							.split('SEPARATOR')
							.filter((md) => md)
							.map((md, index) => {
								const splittedMd = md.split('SPLIT');
								const title = splittedMd[0]
									.replaceAll('*', '')
									.trim();
								const content = splittedMd.slice(1).join('\n');
								return (
									<AccordionItem
										value={`item-${index}`}
										key={md}
									>
										<AccordionTrigger className="text-[16px] text-bold cursor-pointer focus-visible:ring-0">
											{title}
										</AccordionTrigger>
										<AccordionContent>
											<MarkdownViewer
												markdown={content}
											/>
										</AccordionContent>
									</AccordionItem>
								);
							})}
					</Accordion>
					<div className="flex gap-2 flex-wrap">
						{result.links?.length > 0 &&
							result.links.map((link) => (
								<Badge
									className="bg-brand-shinhan-blue text-white"
									key={link.sequence}
								>
									<Link href={link.news_link} target="_blank">
										{link.sequence}
									</Link>
								</Badge>
							))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default AIEvaluation;
