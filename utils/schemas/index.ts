import { z } from 'zod';

export const createPasswordSchema = z.object({
	password: z.string(),
	confirmPassword: z.string(),
});

export type CreatePasswordSchemaType = typeof createPasswordSchema;

export const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type LoginSchemaType = typeof loginSchema;
