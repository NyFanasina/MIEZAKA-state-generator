import { object, z } from "zod";

export const SignInSchema = z.object({
  email: z.coerce.string().email(),
  password: z.coerce.string().min(6),
});

export const SignUpSchema = z.object({
  name: z.coerce.string(),
  password: z.coerce.string(),
  email: z.coerce.string().email(),
});

export type AuthState =
  | {
      error: {
        name?: string;
        code?: number;
        email?: string | string[];
        password?: string | string[];
        message?: string;
      };
    }
  | undefined;

export type AuthPayload = {
  id: number;
  admin: boolean;
};
