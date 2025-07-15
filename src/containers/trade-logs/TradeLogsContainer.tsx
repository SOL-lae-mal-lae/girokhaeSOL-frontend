import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import TradeLogsContainerClient from './TradeLogsContainer.client';

export default async function TradeLogsContainer() {
	const user = await currentUser();

	if (!user) {
		redirect('/auth-required');
	}

	return (
		<div className="flex w-full h-full">
			<TradeLogsContainerClient />
		</div>
	);
}
