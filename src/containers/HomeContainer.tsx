import { currentUser } from '@clerk/nextjs/server';

import { getUserExist } from '@/db/user';

import HomeDialogClient from './HomeDialog.client';
import HomeGeneral from './HomeGeneral';
import HomeUser from './HomeUser';

const HomeContainer = async () => {
	const clientUser = await currentUser();
	console.log('clientUser', clientUser);
	if (!clientUser) {
		return <HomeGeneral />;
	}

	const user = await getUserExist(clientUser.id);

	if (!user) {
		return <div>Error</div>;
	}

	if (!user.length) {
		return <HomeDialogClient />;
	}

	return <HomeUser userName={user[0].nickname ?? ''} />;
};

export default HomeContainer;
