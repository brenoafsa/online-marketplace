import type { IAddressRepository } from "@core/repositories/address.repository.interface";
import type { CreateAddressDTO } from "@application/dtos/address.dto";
import { Address } from "@core/entities/address.entity";
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateAddressUseCase {
    constructor(
        @inject('AddressRepository')
        private AddressRepository: IAddressRepository
    ) {}

    async execute(data: CreateAddressDTO): Promise<Address> {
        return await this.AddressRepository.create(data);
    }
}