"use server";

import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";

export async function fetchEtats() {
  return await STE_miezaka.$queryRaw`SELECT DISTINCT dbo.[F_ARTICLE].[Etat] FROM [F_ARTICLE] WHERE [F_ARTICLE].[FA_CodeFamille] IN ('BALLE', 'FRIPPE') AND [Etat] NOT IN ('C', '')`;
}
