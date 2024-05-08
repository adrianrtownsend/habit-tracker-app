export const emailRule = {
	required: 'Email is required',
	pattern: {
		value: /\S+@\S+\.\S+/,
		message: 'Entered value does not match email format',
	},
};

export const passwordRule = {
	required: 'Password is required',
};

export const confirmPasswordRule = (pass: string, cPass: string) => ({
	validate: () => pass === cPass,
});

export const usernameRule = {
	required: 'Username is required',
};

export const nameRule = {
	required: 'Name is required',
};
