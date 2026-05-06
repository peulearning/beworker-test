import { z } from 'zod';

export const setRedirectSchema = z.object({
  linkId: z.string().uuid(),
  url: z.string().url(),
}); 