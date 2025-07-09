import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
	host: process.env.DB_HOST!,
	user: process.env.DB_USER!,
	database: process.env.DB_NAME!,
	password: process.env.DB_PASSWORD!,
	port: Number(process.env.DB_PORT!),
});

export const db = drizzle({ client: poolConnection });
