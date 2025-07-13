import { Response } from '@/@types/response';
import { User } from '@/@types/user';
import { CLIENT_HOST_FOR_CLIENT } from '@/constants/hosts';

export const createUser = async ({
	age,
	gender,
}: {
	age: number;
	gender: string;
}) => {
	try {
		const response = await fetch(`${CLIENT_HOST_FOR_CLIENT}/api/users`, {
			method: 'POST',
			body: JSON.stringify({ age, gender }),
		});
		if (!response.ok) {
			throw new Error('Failed to create user');
		}
		const data: Response<User> = await response.json();

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};
