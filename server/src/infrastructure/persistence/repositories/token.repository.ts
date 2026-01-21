import type { ITokenRepository } from "@core/repositories/token.repository.interface";
import type { CreateTokenDTO } from "@application/dtos/token.dto";
import { eq } from "drizzle-orm";
import { db } from "@infrastructure/persistence/drizzle/index";
import { Token } from "@core/entities/token.entity";
import { refreshTokenTable } from "../drizzle/schemas/token";
import { injectable } from "tsyringe";

@injectable()
export class TokenRepository implements ITokenRepository {
    async create(data: CreateTokenDTO): Promise<void> {
        await db.insert(refreshTokenTable).values(data).returning();
    }

    async findByUserId(userId: string): Promise<Token | undefined> {
        const [token] = await db
            .select()
            .from(refreshTokenTable)
            .where(eq(refreshTokenTable.userId, userId))
            .limit(1);

        if (!token) {
            return undefined;
        }

        return new Token(token)
    }

    async update(data: CreateTokenDTO): Promise<void> {
        await db
            .update(refreshTokenTable)
            .set({ token: data.token, expiresAt: data.expiresAt })
            .where(eq(refreshTokenTable.userId, data.userId))
            .returning()
    }

    async delete(userId: string): Promise<void> {
        await db.delete(refreshTokenTable).where(eq(refreshTokenTable.userId, userId))
    }
}