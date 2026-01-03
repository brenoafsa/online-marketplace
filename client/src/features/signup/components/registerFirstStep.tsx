import React from "react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon
} from "@/components/ui/input-group";
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    PhoneIcon
} from "@heroicons/react/24/outline";

export function RegisterFirstStep({ onContinue }: { onContinue: () => void }) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

    return (
        <div className="bg-app-dark-blue w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Nome"/>
                        <InputGroupAddon>
                            <UserIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="md:col-span-1">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Sobrenome"/>
                    </InputGroup>
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Email"/>
                        <InputGroupAddon>
                            <EnvelopeIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Telefone"/>
                        <InputGroupAddon>
                            <PhoneIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput type={showPassword ? "text" : "password"} className="text-white" placeholder="Crie uma senha"/>
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
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput type={showConfirmPassword ? "text" : "password"} className="text-white" placeholder="Confirme sua senha"/>
                        <InputGroupAddon>
                            <LockClosedIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:cursor-pointer">
                        {showConfirmPassword ? (
                            <EyeIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        ) : (
                            <EyeSlashIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        )}
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <button onClick={onContinue} className="w-full h-12 bg-app-pink text-white py-2 rounded-md hover:bg-app-pink/70 mt-4">
                Continuar
            </button>
        </div>
    );
}