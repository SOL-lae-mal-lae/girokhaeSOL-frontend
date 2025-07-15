/**
 * 브라우저에서 백엔드로 보낼 때
 */
export const HOST_FOR_CLIENT = process.env.NEXT_PUBLIC_API_URL;
/**
 * 서버컴포넌트에서 백엔드 서버로 보낼 때
 */
export const HOST_FOR_SERVER = process.env.API_URL;

/**
 * 서버 컴포넌트에서 next 서버로 보낼 때
 */
export const CLIENT_HOST_FOR_SERVER = process.env.CLIENT_API_URL;
/**
 * 브라우저에서 next 서버로 보낼 때
 */
export const CLIENT_HOST_FOR_CLIENT = process.env.NEXT_PUBLIC_CLIENT_API_URL;
