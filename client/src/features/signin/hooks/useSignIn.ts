import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signInUser, type FormData, formSchema } from "../api";

export function useSignIn() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      navigate({ to: "/home" });
    },
    onError: (error) => {
      alert(`Erro ao fazer login: ${error.message}`);
    },
  });

  return { register, handleSubmit, errors, mutate, isPending };
}