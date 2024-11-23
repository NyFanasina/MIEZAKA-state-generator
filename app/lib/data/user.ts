"use server";
import { prisma } from "@/prisma/client";
import { formatDateToFr } from "../utils";
import { headers } from "next/headers";

export async function fetchFilteredUsers(keyword = "") {
  try {
    const headersList = headers();
    const host = headersList.get("x-forwarded-proto") + "://" + headersList.get("host");
    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: keyword } }, { email: { contains: keyword } }],
      },
    });

    return users.map((user) => ({
      ...user,
      admin: user.admin ? "Admin" : "Non-admin",
      created_at: formatDateToFr(user.created_at),
      photo: user.photo ? `${host}/users/${user.photo}` : undefined,
    }));
  } catch (error) {
    console.log("Database Error : ", error);
  }
}

export async function fectchUserByid(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}
