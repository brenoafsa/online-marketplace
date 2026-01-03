import { Address } from "@core/entities/address.entity";
import type { CreateAddressDTO } from "@application/dtos/address.dto";

export interface IAddressRepository {
  create(data: CreateAddressDTO): Promise<Address>;
}