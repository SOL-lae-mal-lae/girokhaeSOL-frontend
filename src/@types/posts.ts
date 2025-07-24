export interface Post {
	post_type: boolean;
	user_id: string;
	created_at: Date;
	title: string;
	content: string;
	trade_log_id: number;
	is_public: boolean;
	nickname: string;
}

export interface myPagePosts {
	title: string;
	content: string;
	is_public: boolean;
	post_type: string; // string으로 정의
	user_id: string; // string으로 정의
	created_at: string; // string으로 정의
}
