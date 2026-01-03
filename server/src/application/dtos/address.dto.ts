import { isCuid } from "@paralleldrive/cuid2";
import z from "zod";

export const createAddressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    neighborhood: z.string().min(1, 'Neighborhood is required'),
    latitude: z.number(),
    longitude: z.number(),
    userId: z.string().min(1, 'Creator ID is required').min(24).max(24).refine(isCuid, {
        message: "Creator ID must be a valid Cuid2."
    }),
});

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;