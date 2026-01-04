import { useForm } from "react-hook-form";
import { type FormData, formSchema, createUser } from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          role: "CUSTOMER",
          language: "BR",
        }
      });
    
    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            navigate({ to: "/home"})
        },
        onError: (error) => {
            alert(`Erro ao criar conta: ${error.message}`)
        }
    });

      return { ...formMethods, mutate, isPending };
}