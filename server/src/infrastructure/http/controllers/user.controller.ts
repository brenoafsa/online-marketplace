import { createUserSchema, updateUserSchema } from "@application/dtos/user.dto";
import type { CreateAddressUseCase } from "@application/use-cases/address/create-address";
import type { 
    FindAllUsersUseCase, 
    CreateUserUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
} from "@application/use-cases/user";
import type { User } from "@core/entities/user.entity";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private findAllUsersUseCase: FindAllUsersUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
        private createAddressUseCase: CreateAddressUseCase,
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                phone,
                role,
                language,
                street,
                neighborhood,
                latitude,
                longitude
            } = req.body

            if (!firstName || !lastName || !email || !password || !phone || !role || !language || !street || !neighborhood || !latitude || !longitude) {
                return res.status(400).json({ message: 'Bad Request: Missing required fields.' });
            }

            const userData = createUserSchema.parse({
                firstName,
                lastName,
                email,
                password,
                phone,
                role,
                language,
            });
            
            const createdUserId = await this.createUserUseCase.execute(userData);

            const addressData = {
                street,
                neighborhood,
                latitude,
                longitude,
                userId: createdUserId
            };

            await this.createAddressUseCase.execute(addressData);

            return res.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                message: 'Validation failed',
                errors: error.flatten().fieldErrors,
                });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.findAllUsersUseCase.execute();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({ message: 'ID was not provided'});
            }

            const user = await this.findUserByIdUseCase.execute(id);

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID was not provided'});
            }

            if (Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'No update data provided.' });
            }

            const changesData = updateUserSchema.parse(data);
            
            await this.updateUserUseCase.execute(id, changesData);

            return res.status(200).json({ message: 'User updated successfully.' });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                message: 'Validation failed',
                errors: error.flatten().fieldErrors,
                });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID was not provided'});
            }

            await this.deleteUserUseCase.execute(id);

            return res.status(200).json({ message: 'User deleted successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
}