import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signInUser, type FormData, formSchema } from "../api";
import { toast } from "sonner";

export function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rememberMe: false,
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast.success("Login concluído!");
      navigate({ to: "/home" });
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return { register, handleSubmit, errors, mutate, isPending };
}