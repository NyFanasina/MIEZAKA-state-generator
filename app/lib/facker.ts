"use server";
import { Mouvement } from "./ste_definition";

export default function facker(data: Mouvement[]) {
  return data.map((item) => {
    const random = Math.round(Number(Math.random().toFixed(1)) - 0.5);
    return {
      article: {
        ...item,
        AR_PrixAch: Number(item.article) * random,
        AC_PrixVen: Number(item.article.AC_PrixVen) * random,
        AR_PoidsBrut: Number(item.article.AR_PoidsBrut) * random,
      },
      achat: { AR_Ref: "BRIBRACENKGBAD", Qte: 1348 * random },
      vente: { AR_Ref: "A-MELE145KATT", Qte: 2, Vente_Reelle: 580000 * random },
      report: { AR_Ref: "A-MELE145KATT", Qte: 508 * random },
    };
  });
}
