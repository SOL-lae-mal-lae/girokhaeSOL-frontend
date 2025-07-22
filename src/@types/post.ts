export interface Post {
	id: number;
	post_type: boolean; // true: 매매일지, false: 일반 (혹은 enum으로 바꿔도 됨)
	user_id: string;
	created_at: string; // ISO date string (timestamp)
	title: string;
	content: string;
	trade_log_id?: number | null; // 매매일지와 연결되는 경우만 값이 있음
	is_public: boolean;
}
