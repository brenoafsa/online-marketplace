import React from "react";
import { Link } from "@tanstack/react-router";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { useSignIn } from "../hooks/useSignIn";
import type { FormData } from "../api";
import { Spinner } from "@/components/ui/spinner";

export function SignInPage() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { register, handleSubmit, errors, mutate, isPending } = useSignIn();

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className='flex justify-center items-center bg-app-dark-gray w-screen h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className="border border-white rounded-lg p-8 min-w-96">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <div>
            <InputGroup className="h-12">
              <InputGroupInput {...register("email")} className="text-white" placeholder="Email" />
              <InputGroupAddon>
                <EnvelopeIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
              </InputGroupAddon>
            </InputGroup>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <InputGroup className="h-12">
              <InputGroupInput {...register("password")} type={showPassword ? "text" : "password"} className="text-white" placeholder="Senha" />
              <InputGroupAddon>
                <LockClosedIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end" onClick={() => setShowPassword(!showPassword)} className="hover:cursor-pointer">
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                )}
              </InputGroupAddon>
            </InputGroup>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
        </div>
        <button type="submit" disabled={isPending} className="flex justify-center items-center w-full h-12 bg-app-pink text-white font-semibold py-2 rounded-md hover:bg-app-pink/70 mt-6 disabled:bg-app-pink/40">
          {isPending ? <Spinner className="w-5 h-5" /> : "Entrar"}
        </button>
        <label className="flex max-w-34 mx-auto justify-center items-center gap-2 text-gray-400 text-sm mt-4 cursor-pointer">
          <input type="checkbox" {...register("rememberMe")} className="hover:cursor-pointer" />
          <span>Lembre de mim</span>
        </label>
        <p className="text-center text-sm text-gray-400 mt-4">
          Não tem uma conta? <Link to="/signup" className="font-semibold text-app-pink hover:underline">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}