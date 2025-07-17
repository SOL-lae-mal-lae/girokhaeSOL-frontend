import { redirect } from 'next/navigation';

import { DialogProvider } from '@/hooks/DialogContext';

import TradeLogDetailContainerClient from './TradeLogDetailContainer.client';

interface Props {
	params: Promise<{ date: string }>;
}

const TradeLogDetailContainer = async ({ params }: Props) => {
	const { date } = await params;

	const isFuture = new Date(date) > new Date();

	if (isFuture) {
		redirect('/trade-logs');
	}

	return (
		<DialogProvider>
			<div className="w-full h-full">
				<TradeLogDetailContainerClient date={date} />
			</div>
		</DialogProvider>
	);
};

export default TradeLogDetailContainer;
