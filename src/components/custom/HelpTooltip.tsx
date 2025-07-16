import { FC } from 'react';

import { CircleQuestionMark } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
	text: string;
}

const HelpTooltip: FC<Props> = ({ text }) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<CircleQuestionMark
					className="text-muted-foreground cursor-pointer"
					size={16}
				/>
			</TooltipTrigger>
			<TooltipContent className="bg-brand-shinhan-blue text-white border-brand-shinhan-blue fill-brand-shinhan-blue">
				<p>{text}</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default HelpTooltip;
