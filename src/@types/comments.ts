export interface Comments {
	id: number;
	user_id: string;
	nickname: string;
	content: string;
	created_at: Date;
}

export interface myPageComments {
	id: number;
	user_id: string;
	nickname: string;
	content: string;
	created_at: string; // Adjusted to match the Post interface
	post_id: number;
	post_title: boolean;
}
