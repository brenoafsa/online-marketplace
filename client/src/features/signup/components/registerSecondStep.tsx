import React from "react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon
} from "@/components/ui/input-group";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem 
} from "@radix-ui/react-dropdown-menu";
import {
    LanguageIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";

interface RegisterSecondStepProps {
  onBack: () => void;
  onCreateAccount: () => void;
}

export function RegisterSecondStep({ onBack, onCreateAccount }: RegisterSecondStepProps) {
    const [language, setLanguage] = React.useState("pt-BR");

    const languageLabels: { [key: string]: string } = {
        "pt-BR": "Português Brasileiro",
        "en-US": "Inglês",
    };
    
    return (
        <div className="bg-app-dark-blue w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full">
                                <InputGroup className="h-12 hover:cursor-pointer">
                                    <div className="w-full bg-transparent text-white focus:outline-none flex items-center text-left">
                                        {languageLabels[language]}
                                    </div>
                                    <InputGroupAddon>
                                        <LanguageIcon className="h-6 w-6 text-app-light-gray stroke-1.5 mr-2" />
                                    </InputGroupAddon>
                                </InputGroup>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) bg-app-dark-gray text-white p-2 rounded-md border border-app-light-gray">
                            <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                                <DropdownMenuRadioItem value="pt-BR" className="bg-app-dark-gray hover:bg-gray-600 p-2 rounded-sm outline-none hover:cursor-pointer">Português Brasileiro</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="en-US" className="bg-app-dark-gray hover:bg-gray-600 p-2 rounded-sm outline-none hover:cursor-pointer">Inglês</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Rua"/>
                        <InputGroupAddon>
                            <MapPinIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Bairro"/>
                        <InputGroupAddon>
                            <MapPinIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Latitude"/>
                    </InputGroup>
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput className="text-white" placeholder="Longitude"/>
                    </InputGroup>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <button onClick={onBack} className="w-full h-12 bg-app-light-gray text-white py-2 rounded-md hover:bg-app-light-gray/80">
                    Voltar
                </button>
                <button onClick={onCreateAccount} className="w-full h-12 bg-app-pink text-white py-2 rounded-md hover:bg-app-pink/70">
                    Criar Conta
                </button>
            </div>
        </div>
    );
}