import z from "zod";

export const createTokenSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    userId: z.string().min(1, 'user ID is required'),
    expiresAt: z.date(),
})

export type CreateTokenDTO = z.infer<typeof createTokenSchema>;

export const createTokenUseCaseSchema = z.object({
    userId: z.string().min(1, 'userId is required'),
    rememberMe: z.boolean().optional(),
})

export type CreateTokenUseCaseDTO = z.infer<typeof createTokenUseCaseSchema>;