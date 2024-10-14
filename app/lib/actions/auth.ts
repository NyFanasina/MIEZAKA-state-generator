"use server";

import { AuthState, RegisterState, SignInSchema, SignUpSchema } from "@/app/lib/definition";
import { prisma } from "@/prisma/client";
import * as Session from "@/app/lib/session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { uploadFile } from "../uploadFileHandler";
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

  if (!user) return { message: "Aucun compte corresponde à cette email." };

  const isConnected = await bcrypt.compare(password, user.password);

  if (isConnected) {
    const tt = await Session.createSession(user);
    redirect("/dashboard");
  }

  return {
    message: "Mot de passe invalide .",
  };
}

export async function register(state: RegisterState, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    admin: formData.get("admin"),
    photo: formData.get("photo"),
  });

  if (!validatedFields.success)
    return {
      ok: false,
      error: validatedFields.error.flatten().fieldErrors,
    };

  const { password, photo } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const file = photo as File;
    const photoname = await uploadFile(file);

    const user = await prisma.user.create({
      data: { ...validatedFields.data, password: hashedPassword, photo: photoname },
    });
    return {
      ok: true,
      data: user,
      message: `Succes ! Utilisateur creé avec l'email ${user.email}.`,
    };
  } catch (e) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError)
      return {
        ok: false,
        message: "Email déja pris, veuillez choisir un autre.",
      };
  }
}

export async function logOut() {
  await Session.deleteSession();
  redirect("/login");
}
