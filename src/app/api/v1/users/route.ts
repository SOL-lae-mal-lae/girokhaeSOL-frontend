import { NextResponse } from 'next/server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { USER_GET_DB_ERROR, USER_NOT_FOUND } from '@/constants/error';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

/**
 * @description 유저 정보 조회
 * @param request - 요청 객체
 * @returns 유저 정보 반환
 */
export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId') as string;
	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId));

		if (user.length === 0) {
			return NextResponse.json({ message: USER_NOT_FOUND, data: null });
		}

		return NextResponse.json({
			message: 'User has been fetched!',
			data: user[0],
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: USER_GET_DB_ERROR, data: null },
			{ status: 404 }
		);
	}
};

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
