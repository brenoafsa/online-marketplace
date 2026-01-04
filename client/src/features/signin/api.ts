import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type FormData = z.infer<typeof formSchema>;

export async function signInUser(data: FormData): Promise<any> {
    const res = await fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Falha ao fazer login' }));
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido');
    }

    return res.json();
}