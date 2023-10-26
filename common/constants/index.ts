export const API_PREFIX = '/api';
export const BOOKS_ENDPOINT = '/books';
export const USERS_ENDPOINT = '/users';
export const AUTH_ENDPOINT = '/auth';
export const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-library';