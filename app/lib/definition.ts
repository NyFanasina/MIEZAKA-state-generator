import { object, z } from "zod";

export const SignInSchema = z.object({
  email: z.coerce.string().email({ message: "Veuillez entrer un email valide" }),
  password: z.coerce.string().min(6, "Le mot de passe devrait être au moins à 6 caractères"),
});

export const SignUpSchema = z.object({
  name: z.coerce.string(),
  password: z.coerce.string(),
  email: z.coerce.string().email(),
  photo: z.coerce.string(),
});

export type AuthState =
  | {
      error?: {
        email?: string | string[];
        password?: string | string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  id: number;
  admin: boolean;
};
