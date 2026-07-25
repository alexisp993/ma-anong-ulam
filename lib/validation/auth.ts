import { z } from "zod";

// PRODUCT_BLUEPRINT.md §6.7.11 only requires "all mandatory fields
// completed" — no password complexity/length rule is specified anywhere.
// 8 characters is a reasonable minimum default, not a documented
// requirement.
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
