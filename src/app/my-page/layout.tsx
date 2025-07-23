import CommunityInfoContainer from '@/containers/my-page/CommunityInfo';
import UserInfoContainer from '@/containers/my-page/UserInfo';

export default function MyPageLayout() {
	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8 overflow-x-hidden">
			{/* 1. 유저 정보 */}
			<UserInfoContainer />
			{/* 2. 커뮤니티 활동 내역 */}
			<CommunityInfoContainer />
		</div>
	);
}
