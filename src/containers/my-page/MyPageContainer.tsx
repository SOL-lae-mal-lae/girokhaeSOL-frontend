import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import CommunityInfoContainer from './CommunityInfo';
import UserInfoContainer from './UserInfoContainer.client';

const MyPageContainer = async () => {
	const clientUser = await currentUser();

	if (!clientUser) {
		redirect('/auth-required');
	}

	const email = clientUser.emailAddresses;
	const profileImage = clientUser.imageUrl;

	return (
		<div className="w-full h-full">
			<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
				<UserInfoContainer
					email={email[0]?.emailAddress}
					profileImage={profileImage}
				/>
				<CommunityInfoContainer />
			</div>
		</div>
	);
};

export default MyPageContainer;
