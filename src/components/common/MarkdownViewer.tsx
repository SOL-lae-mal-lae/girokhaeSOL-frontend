import { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
	markdown: string;
}

export const MarkdownViewer: FC<MarkdownViewerProps> = ({ markdown }) => {
	return (
		<div className="p-8[&>ul>li]:text-sub1 font-light">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
		</div>
	);
};
