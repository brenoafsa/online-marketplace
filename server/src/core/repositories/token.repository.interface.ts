import { Token } from "@core/entities/token.entity";
import type { CreateTokenDTO } from "@application/dtos/token.dto";

export interface ITokenRepository {
    create(data: CreateTokenDTO): Promise<void>;
    findByUserId(userId: string): Promise<Token | undefined>;
    update(data: CreateTokenDTO): Promise<void>;
    delete(userId: string): Promise<void>;
}