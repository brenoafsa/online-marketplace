import api from "@/lib/http";
import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
    rememberMe: z.boolean(),
});

export type FormData = z.infer<typeof formSchema>;

export async function signInUser(data: FormData): Promise<void> {
    try {
        await api.post('/signin', data);
    } catch (error: any) {
        const message = error.response?.data?.message || 'Falha ao criar usuário';
        throw new Error(message);
    }
}