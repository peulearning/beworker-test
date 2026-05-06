import { z } from 'zod';

export const createLinkSchema = z.object({
  name: z.string().min(1),
  baseUrl: z.string().url(),
  projectId: z.string().uuid(),
});

