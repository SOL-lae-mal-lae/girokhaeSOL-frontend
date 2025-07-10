import { Response } from '@/@types/response';

export const fetchData = async <T>(
	path: string,
	init: RequestInit
): Promise<Response<T> | null> => {
	try {
		const response = await fetch(`${process.env.API_URL}/api${path}`, {
			...init,
		});

		const data: Response<T> = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
