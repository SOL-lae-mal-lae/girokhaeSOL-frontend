import { currentUser } from '@clerk/nextjs/server';

import { User } from '@/@types/user';
import { fetchData } from '@/services/fetchData';

import HomeDialogClient from './HomeDialog.client';
import HomeGeneral from './HomeGeneral';
import HomeUser from './HomeUser';

const HomeContainer = async () => {
	const clientUser = await currentUser();

	if (!clientUser) {
		return <HomeGeneral />;
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

	return <HomeUser userName={res.data.nickname} />;
};

export default HomeContainer;
