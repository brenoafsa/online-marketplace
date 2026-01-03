import type { IAddressRepository } from "@core/repositories/address.repository.interface";
import type { CreateAddressDTO } from "@application/dtos/address.dto";
import { Address } from "@core/entities/address.entity";

export class CreateAddressUseCase {
    constructor(private AddressRepository: IAddressRepository) {}

    async execute(data: CreateAddressDTO): Promise<Address> {
        return await this.AddressRepository.create(data);
    }
}