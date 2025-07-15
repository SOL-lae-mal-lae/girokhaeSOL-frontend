import { redirect } from 'next/navigation';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import NewTradeLogContainerClient from './NewTradeLogContainer.client';

interface Props {
	searchParams: Promise<{ date: string }>;
}

const NewTradeLogContainer = async ({ searchParams }: Props) => {
	const { date } = await searchParams;

	const today = new Date();
	const todayString = format(today, 'yyyy-MM-dd', { locale: ko });
	const isFuture = date > todayString;

	if (isFuture) {
		redirect('/trade-logs');
	}

	return (
		<div className="w-full h-full">
			<NewTradeLogContainerClient date={date} />
		</div>
	);
};

export default NewTradeLogContainer;
