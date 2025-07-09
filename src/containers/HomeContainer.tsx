import { currentUser } from '@clerk/nextjs/server';

import { User } from '@/@types/user';
import { fetchData } from '@/services/fetchData';

import HomeBody from './HomeBody';
import HomeDialogClient from './HomeDialog.client';

const HomeContainer = async () => {
	const clientUser = await currentUser();

	if (!clientUser) {
		return <HomeBody />;
	}

	const res = await fetchData<User | null>(`/users?userId=${clientUser.id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res) {
		return <div>Error</div>;
	}

	if (!res.data) {
		return <HomeDialogClient />;
	}

	return <HomeBody />;
};

export default HomeContainer;
