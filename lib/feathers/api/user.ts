// user.ts

import feathersClient from '..';

const userService = feathersClient.service('users');

export const getUsers = async (params: any) => {
	try {
		const u = await userService.find({ query: params });
		return u;
	} catch (error) {
		return null;
	}
};
