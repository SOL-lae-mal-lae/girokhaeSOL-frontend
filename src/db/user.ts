import { eq } from 'drizzle-orm';

import { usersTable } from './schema';

import { db } from '.';

export const getUserExist = async (userId: string) => {
	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId));

		return user;
	} catch (e) {
		console.error(e);
		return null;
	}
};
