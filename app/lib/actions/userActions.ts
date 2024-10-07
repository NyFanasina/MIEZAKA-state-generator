"use server";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { RegisterState, SignUpEditSchema } from "../definition";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
const bcrypt = require("bcrypt");

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath(`/users`);
  } catch (error) {
    console.log("Database error : ", error);
  } finally {
  }
}

export async function updateUser(state: RegisterState, formData: FormData) {
  const validatedFields = SignUpEditSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      ok: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const dd = await prisma.user.update({
      where: {
        id,
      },
      data: { ...validatedFields.data, password: hashedPassword, id: undefined },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError)
      return {
        ok: false,
        message: "Email déja pris, veuillez choisir un autre.",
      };
  }
  revalidatePath("/users");
  redirect("/users");
}
