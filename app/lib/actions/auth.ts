"use server";

import { AuthState, SignInSchema, SignUpSchema } from "@/app/lib/definition";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";
import * as Session from "@/app/lib/session";
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

  const isConnected = await bcrypt.compare(password, user.password);

  if (isConnected) {
    await Session.createSession(user);
    redirect("/dashboard");
  }

  return {
    message: "Veuillez réessayer, email ou mot de passe invalide :( .",
  };
}

export async function register(formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    photo: formData.get("photo"),
  });

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

  console.log(user);
  // return user;
}
