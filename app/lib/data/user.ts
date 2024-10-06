"use server";
import { prisma } from "@/prisma/client";
import { formatDateToFr } from "../utils";
import { number } from "zod";

export async function fetchFilteredUsers(keyword = "") {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: keyword } }, { email: { contains: keyword } }],
      },
    });

    return users.map((user) => ({
      ...user,
      admin: user.admin ? "Admin" : "Non-admin",
      created_at: formatDateToFr(user.created_at),
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
