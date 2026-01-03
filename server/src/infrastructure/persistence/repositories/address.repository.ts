import type { IAddressRepository } from "@core/repositories/address.repository.interface";
import type { CreateAddressDTO } from "@application/dtos/address.dto";
import { db } from "@infrastructure/persistence/drizzle/index";
import { Address } from "@core/entities/address.entity";
import { addressTable } from "@infrastructure/persistence/drizzle/schemas/address";

export class AddressRepository implements IAddressRepository {
    async create(data: CreateAddressDTO): Promise<Address> {
        const [address] = await db.insert(addressTable).values(data).returning();
        if (!address) {
            throw new Error("Failed to create user.");
        }
        return address
    }
}