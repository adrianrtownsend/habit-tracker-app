// auth.ts
import { router } from 'expo-router';
import feathersClient from '..';

interface AuthData {
	email: string;
	password: string;
}

interface SignupResponse {
	id: string;
	email: string;
}

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

const auth = {
	signup: async (data: AuthData) => {
		await feathersClient.service('users').create(data);
	},

	login: async (data: AuthData) => {
		await feathersClient.authenticate({
			strategy: 'local',
			...data,
		});
	},

	logout: async () => {
		await feathersClient.logout();
	},
	googleOAuth: async () => {
		try {
			await feathersClient.authenticate({
				strategy: 'google',
			});
		} catch (error) {
			throw error;
		}
	},
};

export default auth;
