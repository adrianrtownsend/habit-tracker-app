import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().min(1, 'Email is required').email(),
	password: z
		.string()
		.min(6, 'Must be at least 8 characters in length')
		.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		.regex(new RegExp('.*\\d.*'), 'One number')
		.regex(
			new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
			'One special character'
		),
	confirmpassword: z
		.string()
		.min(6, 'Must be at least 8 characters in length')
		.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		.regex(new RegExp('.*\\d.*'), 'One number')
		.regex(
			new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
			'One special character'
		),
	rememberme: z.boolean().optional(),
});
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email(),
	password: z.string().min(1, 'Password is required'),
	rememberme: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const createPasswordSchema = z.object({
	password: z
		.string()
		.min(6, 'Must be at least 8 characters in length')
		.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		.regex(new RegExp('.*\\d.*'), 'One number')
		.regex(
			new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
			'One special character'
		),
	confirmpassword: z
		.string()
		.min(6, 'Must be at least 8 characters in length')
		.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		.regex(new RegExp('.*\\d.*'), 'One number')
		.regex(
			new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
			'One special character'
		),
});

export type CreatePasswordSchemaType = z.infer<typeof createPasswordSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().min(1, 'Email is required').email(),
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
