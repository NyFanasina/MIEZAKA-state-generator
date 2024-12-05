import { z } from "zod";

export interface CategorieBalle {
  "PETITE BALLE"?: Array<any>;
  "GROSSE BALLE"?: Array<any>;
}

const StringBoolean = z.preprocess((val) => {
  if (typeof val === "string") {
    if (val === "1" || val === "true") return true;
    if (val === "0" || val === "false") return false;
  }
  return val;
}, z.coerce.boolean());

export const SignInSchema = z.object({
  email: z.coerce.string().email({ message: "Veuillez entrer un email valide" }),
  password: z.coerce.string().min(6, "Le mot de passe devrait être au moins à 6 caractères"),
});

export const SignUpSchema = z.object({
  name: z.string().min(6, "Le nom doit être au moins 4 caractères"),
  password: z.string().trim().min(6, "Le mot doit être au moins 6 caractères"),
  email: z.string().email(),
  admin: StringBoolean,
  photo: z.instanceof(File),
});

export const SignUpEditSchema = SignUpSchema.merge(z.object({ id: z.coerce.number() }));

export type AuthState =
  | {
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type RegisterState =
  | {
      ok: boolean;
      data?: any;
      error?: {
        name?: string[];
        password?: string[];
        email?: string[];
        admin?: string[];
        photo?: string[];
      };
    }
  | undefined;

export type SessionPayload = {
  id: number;
  admin: boolean;
};
