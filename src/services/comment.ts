import { Response } from '@/@types/response';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const createComment = async (postId: string, content: string) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content }),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<{ message: string }> = await response.json();

		return data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const getComments = async (postId: string) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}/comments`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<Comment[]> = await response.json();

		return data.data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const updateComment = async (
	postId: string,
	commentId: string,
	content: string
) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}/comments/${commentId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content }),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<{ message: string }> = await response.json();

		return data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};

export const deleteComment = async (postId: string, commentId: string) => {
	try {
		const response = await fetch(
			`${CLIENT_HOST_FOR_CLIENT}/api/v1/community/${postId}/comments/${commentId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: Response<{ message: string }> = await response.json();

		return data;
	} catch (error) {
		console.error('API 호출 에러:', error);
		return null;
	}
};
