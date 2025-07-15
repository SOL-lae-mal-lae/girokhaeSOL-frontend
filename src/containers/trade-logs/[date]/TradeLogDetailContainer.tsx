import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{ date: string }>;
}

const TradeLogDetailContainer = async ({ params }: Props) => {
	const { date } = await params;

	const isFuture = new Date(date) > new Date();

	if (isFuture) {
		redirect('/trade-logs');
	}

	return <div>TradeLogDetailContainer</div>;
};

export default TradeLogDetailContainer;
