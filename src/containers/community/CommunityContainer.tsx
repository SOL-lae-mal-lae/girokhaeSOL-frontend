import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import CommunityContainerClient from './CommunityContainer.client';

const CommunityContainer = async () => {
	const clientUser = await currentUser();

	if (!clientUser) {
		redirect('/auth-required');
	}

	return <CommunityContainerClient />;
};

export default CommunityContainer;
