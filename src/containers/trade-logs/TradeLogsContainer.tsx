import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

export default async function TradeLogsContainer() {
	const user = await currentUser();

	if (!user) {
		redirect('/auth-required');
	}

	return <div>TradeLogsContainer</div>;
}
