import { Response } from '@/@types/response';

export const fetchClientData = async <T>(
	path: string,
	init: RequestInit
): Promise<T | null> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/v1${path}`,
			{
				...init,
			}
		);

		const data: Response<T> = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}

		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
