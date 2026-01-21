import z from "zod";

export const authSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    rememberMe: z.boolean(),
})

export type AuthUserDTO = z.infer<typeof authSchema>;

export const authResponse = z.object({
    token: z.string().min(1, 'Token is required'),
    expiresAt: z.date().optional(),
    userId: z.string().min(1, 'User Id is required')
})

export type AuthResponseDTO = z.infer<typeof authResponse>;