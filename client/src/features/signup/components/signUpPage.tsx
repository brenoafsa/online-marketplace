import React from "react";
import { RegisterFirstStep } from "./registerFirstStep";
import { RegisterSecondStep } from "./registerSecondStep";
import { Link, useNavigate } from "@tanstack/react-router";
import { createUser, type FormData, formSchema } from "../api";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

export function SignUpPage() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const navigate = useNavigate();
  const validation = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "CUSTOMER",
      language: "BR",
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate({ to: "/home"})
    },
    onError: (error) => {
      alert(`Erro ao criar conta: ${error.message}`)
    }
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  }

  const handleContinue = async () => {
    const fields: (keyof FormData)[] = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"];
    const isValid = await validation.trigger(fields);
    if (isValid) {
      setStep(2);
    }
  }

  return (
    <FormProvider {...validation}>
      <div className='flex justify-center items-center bg-app-dark-gray w-screen h-screen pt-18'>
        <form onSubmit={validation.handleSubmit(onSubmit)} className="border border-white rounded-lg p-8 min-w-125 min-h-150">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold">Crie sua conta</h1>
                <p className="text-app-light-gray mt-2">Preencha os dados para começar</p>
              </div>
              <RegisterFirstStep onContinue={handleContinue}/>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold">Complete seu perfil</h1>
                <p className="text-app-light-gray mt-2">Informações de contato e endereço</p>
              </div>
              <RegisterSecondStep onBack={() => setStep(1)} isSubmitting={isPending}/>
            </>
          )}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className={`w-12 h-3 rounded-full ${step === 1 ? 'bg-white' : 'bg-gray-500'}`}></div>
            <div className={`w-12 h-3 rounded-full ${step === 2 ? 'bg-white' : 'bg-gray-500'}`}></div>
          </div>
          <div className="flex justify-center items-center text-[1rem] font-semibold gap-1 mt-4">
            <p className="text-app-light-gray">Já tem uma conta?</p>
            <Link to="/home" className="text-app-pink hover:text-app-pink/70">Entrar</Link>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}