import type { IUserRepository } from "@core/repositories/user.repository.interface";
import type { CreateUserDTO, UpdateUserDTO } from "@application/dtos/user.dto";
import { db } from "@infrastructure/persistence/drizzle/index";
import { userTable } from "@infrastructure/persistence/drizzle/schemas/user";
import { User } from "@core/entities/user.entity";
import { desc, eq } from "drizzle-orm";
import { addressTable } from "@infrastructure/persistence/drizzle/schemas/address";

export class UserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<string> {
        const [user] = await db.insert(userTable).values(data).returning();
        if (!user) {
            throw new Error("Failed to create user.");
        }
        return user.id
    }

    async findAll(): Promise<User[]> {
        const result = await db
            .select()
            .from(userTable)
            .leftJoin(addressTable, eq(userTable.id, addressTable.userId))
            .orderBy(desc(userTable.createdAt));

        if (!result) {
            throw new Error("Failed to find users. The database did not return records.");
        }

        return result.map(row => {
            const { user, address } = row;
            if (!address) {
                throw new Error(`User with id ${user.id} does not have an address.`);
            }
            return new User({
                ...user,
                role: user.role as "CUSTOMER" | "SELLER",
                language: user.language as "BR" | "EN",
                address: {
                    street: address.street,
                    neighborhood: address.neighborhood,
                    latitude: address.latitude,
                    longitude: address.longitude,
                }
            });
        });
    }

    async findById(id: string): Promise<User> {
        const [result] = await db
        .select()
        .from(userTable)
        .leftJoin(addressTable, eq(userTable.id, addressTable.userId))
        .where(eq(userTable.id, id));

        if (!result) {
            throw new Error("Failed to find user. The database did not return a record.");
        }

        const { user, address } = result;

        if (!address) {
            throw new Error(`User with id ${user.id} does not have an address.`);
        }

        return new User({
            ...user,
            role: user.role as "CUSTOMER" | "SELLER",
            language: user.language as "BR" | "EN",
            address: {
                street: address.street,
                neighborhood: address.neighborhood,
                latitude: address.latitude,
                longitude: address.longitude,
            }
        });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const [result] = await db
        .select()
        .from(userTable)
        .leftJoin(addressTable, eq(userTable.id, addressTable.userId))
        .where(eq(userTable.email, email));

        if (!result) {
            return undefined;
        }

        const { user, address } = result;

        if (!address) {
            throw new Error(`User with id ${user.id} does not have an address.`);
        }

        return new User({
            ...user,
            role: user.role as "CUSTOMER" | "SELLER",
            language: user.language as "BR" | "EN",
            address: {
                street: address.street,
                neighborhood: address.neighborhood,
                latitude: address.latitude,
                longitude: address.longitude,
            }
        });
    }

    async update(id: string, changes: UpdateUserDTO): Promise<void> {
        await db.update(userTable).set({
            ...changes,
            updatedAt: new Date()
        }).where(eq(userTable.id, id));
    }

    async delete(id: string): Promise<void> {
        await db.delete(userTable).where(eq(userTable.id, id));
    }
}