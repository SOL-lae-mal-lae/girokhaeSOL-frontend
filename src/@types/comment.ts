export interface Comment {
	id: number;
	post_id: number;
	user_id: string;
	content: string;
	created_at: string; // ISO date string (timestamp)
}
