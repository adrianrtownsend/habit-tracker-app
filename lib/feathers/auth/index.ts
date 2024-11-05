// auth.ts
import { Feathers } from '@feathersjs/feathers';
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
		try {
			await feathersClient.service('users').create(data);
		} catch (error) {
			throw error;
		}
	},

	login: async (data: AuthData) => {
		try {
			await feathersClient.authenticate({
				strategy: 'local',
				...data,
			});
		} catch (error) {
			throw error;
		}
	},

	logout: async () => {
		try {
			await feathersClient.logout();
		} catch (error) {
			throw error;
		}
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
