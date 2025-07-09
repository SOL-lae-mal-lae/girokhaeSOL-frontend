import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
	id: varchar('id', { length: 50 }).primaryKey().notNull(),
	nickname: varchar('nickname', { length: 25 }),
	age: int('age'),
	gender: varchar('gender', { length: 10 }),
});
