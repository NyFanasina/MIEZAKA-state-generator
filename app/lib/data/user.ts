import { prisma } from "@/prisma/client";
import { formatDateToFr } from "../utils";

export async function fetchFilteredUsers(keyword = "") {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: keyword } }, { email: keyword }],
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
