import { Comment } from '@/@types/comment';
import { Post } from '@/@types/post';
import { User } from '@/@types/user';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const fetchUserComments = async (): Promise<Comment[]> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/my-page/comments`
		);

		if (!res.ok) {
			return [];
		}

		const data = await res.json();

		// Ensure data.comments is always an array
		const mappedComments = (data.data.comments || []).map(
			(comment: Comment) => ({
				id: comment.id,
				content: comment.content,
				userId: comment.user_id,
				createdAt: comment.created_at,
			})
		);

		return mappedComments;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchCurrentUserPosts = async (): Promise<Post[]> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/my-page/posts`
		);

		if (!res.ok) {
			return [];
		}

		const data = await res.json();

		// Ensure data.posts is always an array
		const mappedPosts = (data.data.posts || []).map((post: Post) => ({
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
		return [];
	}
};

export const fetchCurrentUserInfo = async (): Promise<User | null> => {
	try {
		const res = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/my-page/user`
		);

		if (!res.ok) {
			return null;
		}

		const data = await res.json();

		// 수정된 부분: data.posts에 접근하도록 수정
		// Map the user information from the response
		const mappedUserInfo = {
			id: data.data.user.id,
			nickname: data.data.user.nickname,
			age: data.data.user.age,
			gender: data.data.user.gender,
			email: data.data.user.email,
			postsCount: data.data.user.posts_count,
			commentsCount: data.data.user.comments_count,
			profileImage: data.data.user.profile_image,
		};

		return mappedUserInfo;
	} catch (error) {
		console.error(error);
		return null;
	}
};
