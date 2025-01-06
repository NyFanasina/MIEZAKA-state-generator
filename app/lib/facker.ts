"use server";
import { Mouvement } from "./ste_definition";

export async function facker(data: Mouvement[]) {
  return data.map((item) => {
    const random = parseFloat((Math.random() * (0.8 - 0.4) + 0.4).toFixed(1));
    const re: Mouvement = {
      ...item,

      article: {
        ...item.article,
        AR_PrixAch: Number(item.article) * random,
        AC_PrixVen: (Number(item.article.AC_PrixVen) * random).toString(),
        AR_PoidsBrut: Number(item.article.AR_PoidsBrut) * random,
      },
    };
    return re;
  });
}
