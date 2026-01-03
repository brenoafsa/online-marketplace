import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string().min(1, 'Phone is required'),
  role: z.enum(['CUSTOMER', 'SELLER']),
  language: z.enum(['BR', 'EN']),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  phone: z.string().min(1, 'Phone is required').optional(),
  role: z.enum(['CUSTOMER', 'SELLER']).optional(),
  language: z.enum(['BR', 'EN']).optional(),
}).strict();

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;