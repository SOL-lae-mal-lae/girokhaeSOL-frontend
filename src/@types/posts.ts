export interface Post {
	post_type: boolean;
	user_id: string;
	created_at: Date;
	title: string;
	content: string;
	trade_log_id: number;
	is_public: boolean;
}
