export interface CommunityAllPost {
	id: number;
	post_type: boolean; // true: '일반', false: '매매일지'
	user_id: string;
	nickname: string;
	created_at: Date;
	title: string;
	content: string;
	comment_count: number;
	tags: string[];
}

export interface CommunityPost {
	post_type: boolean; // true: '일반', false: '매매일지'
	user_id: string;
	nickname: string;
	created_at: Date;
	title: string;
	content: string;
	trade_log_id: number;
	is_public: boolean; //투자 정보 공개 여부
}

export type CommunityPostList = CommunityAllPost[];
