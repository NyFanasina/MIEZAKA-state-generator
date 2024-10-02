import { object, z } from "zod";

export const SignInSchema = z.object({
  email: z.coerce.string().email(),
  password: z.coerce.string().min(6),
});

export type AuthState =
  | {
      error: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
