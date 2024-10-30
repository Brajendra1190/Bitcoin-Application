import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  phoneNumber: z.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Invalid Indian phone number'),
  kycVerified: z.boolean().default(false),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').optional(),
  aadharNumber: z.string().regex(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Invalid Aadhaar number').optional()
});

export type User = z.infer<typeof UserSchema>;