import React from "react";
import { RegisterFirstStep } from "./registerFirstStep";
import { RegisterSecondStep } from "./registerSecondStep";
import { Link } from "@tanstack/react-router";

export function SignUpPage() {
  const [step, setStep] = React.useState<1 | 2>(1);

  return (
    <>
      <div className='flex justify-center items-center bg-app-dark-gray w-screen h-screen pt-18'>
        <div className="border border-white rounded-lg p-8 w-125 h-150">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold">Crie sua conta</h1>
                <p className="text-app-light-gray mt-2">Preencha os dados para começar</p>
              </div>
              <RegisterFirstStep onContinue={() => setStep(2)}/>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold">Complete seu perfil</h1>
                <p className="text-app-light-gray mt-2">Informações de contato e endereço</p>
              </div>
              <RegisterSecondStep onBack={() => setStep(1)} onCreateAccount={() => alert("Criou conta!")}/>
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
        </div>
      </div>
    </>
  )
}