import { redirect } from 'next/navigation';

import NewTradeLogContainerClient from './NewTradeLogContainer.client';

interface Props {
	searchParams: Promise<{ date: string }>;
}

const NewTradeLogContainer = async ({ searchParams }: Props) => {
	const { date } = await searchParams;

	const isFuture = new Date(date) > new Date();

	if (isFuture) {
		redirect('/trade-logs');
	}

	return <NewTradeLogContainerClient date={date} />;
};

export default NewTradeLogContainer;
