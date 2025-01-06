"server-only";

import { prisma } from "@/prisma/client";

export async function fetchFilters(name: string = "") {
  return await prisma.filters.findMany({
    where: {
      filter_name: {
        contains: name,
      },
    },
  });
}

export async function fetchFilterByid(id: number) {
  return await prisma.filters.findFirst({
    where: { id },
  });
}

export async function fetchFilterByName(name: string) {
  const filter_name = decodeURI(name);
  return await prisma.filters.findFirst({
    where: { filter_name },
  });
}
