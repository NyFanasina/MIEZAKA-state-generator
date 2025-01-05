"use server";
import { prisma } from "@/prisma/client";
import { FilterSchema } from "../definition";
import { getSession } from "../session";

const CreateFilter = FilterSchema.omit({ created_at: true, updated_at: true, id: true });

export async function createFiter(formdata: FormData) {
  const { id }: any = await getSession();
  const raw = CreateFilter.parse({
    ...Object.fromEntries(formdata),
    filter_supplier: formdata.getAll("filter_supplier").join("+"),
    user_id: id,
  });

  await prisma.filters.create({
    data: {
      filter_name: raw.filter_name,
      filter_category: raw.filter_category,
      filter_type: raw.filter_type,
      filter_stock_weight: raw.filter_stock_weight,
      user_id: raw.user_id,
      filter_marge: raw.filter_marge,
      filter_supplier: raw.filter_supplier,
      filter_etat: raw.filter_etat,
    },
  });
}

export async function updateFilter(filter_id: number, formdata: FormData) {
  const { id }: any = await getSession();
  const raw = CreateFilter.parse({
    ...Object.fromEntries(formdata),
    filter_supplier: formdata.getAll("filter_supplier").join("+"),
    user_id: id,
  });

  await prisma.filters.update({
    where: { id: filter_id },
    data: {
      filter_name: raw.filter_name,
      filter_category: raw.filter_category,
      filter_type: raw.filter_type,
      filter_stock_weight: raw.filter_stock_weight,
      filter_marge: raw.filter_marge,
      filter_supplier: raw.filter_supplier,
      filter_etat: raw.filter_etat,
    },
  });
}

export async function deleteFilter(id: string) {
  await prisma.filters.delete({ where: { id: parseInt(id) } });
}
