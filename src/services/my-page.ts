import { Comment } from '@/@types/comment';
import { Post } from '@/@types/post';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const fetchUserComments = async (): Promise<Comment[] | null> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/my-page/comments`
		);

		if (!res.ok) {
			return null;
		}

		const data = await res.json();

		// 수정된 부분: data.comments에 접근하도록 수정
		const mappedComments = data.data.comments.map((comment: Comment) => ({
			id: comment.id,
			content: comment.content,
			userId: comment.user_id,
			createdAt: comment.created_at,
		}));

		return mappedComments;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const fetchCurrentUserPosts = async (): Promise<Post[] | null> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/my-page/posts`
		);

		if (!res.ok) {
			return null;
		}

		const data = await res.json();

		// 수정된 부분: data.posts에 접근하도록 수정
		const mappedPosts = data.data.posts.map((post: Post) => ({
			id: post.id,
			title: post.title,
			content: post.content,
			isPublic: post.is_public,
			postType: post.post_type,
			userId: post.user_id,
			createdAt: post.created_at,
		}));

		return mappedPosts;
	} catch (error) {
		console.error(error);
		return null;
	}
};
