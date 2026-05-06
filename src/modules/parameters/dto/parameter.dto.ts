import { z } from 'zod';

export const createParameterSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});