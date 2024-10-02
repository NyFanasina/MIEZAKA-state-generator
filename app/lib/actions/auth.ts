"use server";
import { AuthState, SignInSchema } from "@/app/lib/definition";

export async function authenticate(state: AuthState, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  await new Promise((resolve) => setTimeout(() => console.log("first"), 5000));
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // const hashedPassword = bcrypt

  // return validatedFields.data;
}
