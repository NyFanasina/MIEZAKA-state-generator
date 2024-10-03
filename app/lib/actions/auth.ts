"use server";
import { AuthState, SignInSchema, SignUpSchema } from "@/app/lib/definition";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const bcrypt = require("bcrypt");

export async function authenticate(state: AuthState, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //  check data type
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  //checking identity
  const { email, password } = validatedFields.data;
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) return;

  bcrypt.compare(password, user.password, (error: Error, isConnected: boolean) => {
    if (isConnected) {
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  });
}

export async function register(state: AuthState, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) return;

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      admin: true,
      email,
    },
  });

  return user;
}
