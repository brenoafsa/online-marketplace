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
import { Spinner } from "@/components/ui/spinner"
import { useFormContext } from "react-hook-form";
import { type FormData } from "../api";

interface RegisterSecondStepProps {
  onBack: () => void;
  isSubmitting: boolean;
}

export function RegisterSecondStep({ onBack, isSubmitting }: RegisterSecondStepProps) {
    const { register, setValue, watch, formState: { errors } } = useFormContext<FormData>();
    const language = watch("language");

    const languageLabels: { [key: string]: string } = {
        "BR": "Português Brasileiro",
        "EN": "Inglês",
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
                            <DropdownMenuRadioGroup value={language} onValueChange={(value) => setValue("language", value)}>
                                <DropdownMenuRadioItem value="BR" className="bg-app-dark-gray hover:bg-gray-600 p-2 rounded-sm outline-none hover:cursor-pointer">Português Brasileiro</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="EN" className="bg-app-dark-gray hover:bg-gray-600 p-2 rounded-sm outline-none hover:cursor-pointer">Inglês</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput {...register("street")} className="text-white" placeholder="Rua"/>
                        <InputGroupAddon>
                            <MapPinIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput {...register("neighborhood")} className="text-white" placeholder="Bairro"/>
                        <InputGroupAddon>
                            <MapPinIcon className="h-6 w-6 text-app-light-gray stroke-1.5" />
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput {...register("latitude")} className="text-white" placeholder="Latitude"/>
                    </InputGroup>
                    {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
                </div>
                <div className="md:col-span-2">
                    <InputGroup className="h-12">
                        <InputGroupInput {...register("longitude")} className="text-white" placeholder="Longitude"/>
                    </InputGroup>
                    {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <button type="button" onClick={onBack} className="w-full h-12 bg-app-light-gray text-white py-2 rounded-md hover:bg-app-light-gray/80">
                    Voltar
                </button>
                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center gap-2 w-full h-12 bg-app-pink text-white py-2 rounded-md hover:bg-app-pink/70">
                    {isSubmitting ? <Spinner className="w-5 h-5"/> : "Criar Conta"}
                </button>
            </div>
        </div>
    );
}