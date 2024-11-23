"use server";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { RegisterState, SignUpEditSchema } from "../definition";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "../uploadFileHandler";
const bcrypt = require("bcrypt");

export async function deleteUser(id: number) {
  try {
    prisma.user.delete({ where: { id } }).then((user) => {
      if (user.photo) deleteFile(user.photo);
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
    admin: formData.get("admin"),
    password: formData.get("password"),
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    return {
      ok: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, password, photo } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const filename = photo.size ? await uploadFile(photo) : undefined;
    const oldFilename = (await prisma.user.findUnique({ where: { id }, select: { photo: true } }))?.photo ?? "";

    prisma.user
      .update({
        where: {
          id,
        },
        data: { ...validatedFields.data, password: hashedPassword, id: undefined, photo: filename },
      })
      .then(() => {
        if (filename) deleteFile(oldFilename);
      });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError)
      return {
        ok: false,
        message: "Email déja pris, veuillez choisir un autre.",
      };
  }
  revalidatePath("/users");
  redirect("/users");
}
