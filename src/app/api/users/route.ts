import { NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs/server';

import { USER_NOT_FOUND } from '@/constants/error';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

/**
 * @description 유저 정보 생성
 * @param {age} number - 나이
 * @param {gender} male | female - 성별
 * @returns 유저 정보 반환
 */
export const POST = async (request: Request) => {
	const { age, gender } = await request.json();

	const clientUser = await currentUser();

	if (!clientUser?.id) {
		return NextResponse.json(
			{ message: USER_NOT_FOUND, data: null },
			{ status: 404 }
		);
	}

	const user = await db.insert(usersTable).values({
		id: clientUser.id,
		nickname: clientUser.username,
		age,
		gender,
	});

	return NextResponse.json({
		message: 'User has been inserted!',
		data: user,
	});
};
