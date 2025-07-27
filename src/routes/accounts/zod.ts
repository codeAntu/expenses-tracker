import { z } from 'zod';

export const amountChangeSchema = z.object({
  amount: z.number().min(1, { message: 'Amount must be a positive number' }),
  description: z.string().max(200, { message: 'Description must be 200 characters or less' }).optional(),
});
