import { z } from "zod";

interface BestSeller {
  AR_Ref: string;
  AR_Design: string;
  Montant_Dedouan: string;
  Qte_Vente: string;
}
export const BestSellerSchema = z.object({
  Mois: z.coerce.number(),
  Qte_Vente: z.coerce.number(),
});

export const GlobalStaticChartSchema = z.object({
  Mois: z.coerce.string(),
  Qte_Vente: z.coerce.number(),
});
