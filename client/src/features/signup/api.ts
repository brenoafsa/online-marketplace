import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
  role: z.string(),
  language: z.string(),
  street: z.string().min(1, "Rua é obrigatória"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  latitude: z.string().min(1, "Latitude é obrigatória"),
  longitude: z.string().min(1, "Longitude é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type FormData = z.infer<typeof formSchema>;

export async function createUser(data: FormData): Promise<void> {
    const { confirmPassword, ...apiData} = data;
    const res = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Falha ao criar usuário' }));
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido');
    }
}