import { useForm } from "react-hook-form";
import { type FormData, formSchema, createUser } from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "CUSTOMER",
      language: "BR",
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success("Cadastro concluído!");
      navigate({ to: "/home" })
    },
    onError: (error) => {
      toast.warning(error.message);
    }
  });

  return { ...formMethods, mutate, isPending };
}