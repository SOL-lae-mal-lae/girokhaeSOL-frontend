import { redirect } from 'next/navigation';

interface Props {
	searchParams: Promise<{ date: string }>;
}

const NewTradeLogContainer = async ({ searchParams }: Props) => {
	const { date } = await searchParams;

	const isFuture = new Date(date) > new Date();

	if (isFuture) {
		redirect('/trade-logs');
	}

	return <div>NewTradeLogContainer</div>;
};

export default NewTradeLogContainer;
