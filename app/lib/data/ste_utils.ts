"use server";

import { prisma } from "@/prisma/client";
import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";

export async function fetchEtats() {
  return await STE_miezaka.$queryRaw`SELECT DISTINCT dbo.[F_ARTICLE].[Etat] FROM [F_ARTICLE] WHERE [F_ARTICLE].[FA_CodeFamille] IN ('BALLE', 'FRIPPE') AND [Etat] NOT IN ('C', '')`;
}

export async function fetchStatistiquesGlobales() {
  const art_fourniss = (
    await STE_miezaka.$queryRaw<any[]>`SELECT
    (
    SELECT COUNT(*) AS co FROM (
        SELECT 
        DISTINCT (
        CASE 
        WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%PRO%' THEN  CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ' ,'PRO')
        WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% O' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//O')
        WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% T' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//T')
        WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% N' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//N')
        WHEN dbo.[F_ARTICLE].[AR_Ref] = 'TTR' THEN CONCAT('Ancien',' ',dbo.[F_COMPTET].[CT_Intitule])
            ELSE dbo.[F_COMPTET].[CT_Intitule]
        END)  AS Nom_Fournisseur
        FROM dbo.F_ARTICLE 
        JOIN dbo.[F_ARTFOURNISS] 
            ON dbo.[F_ARTFOURNISS].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
        JOIN dbo.[F_COMPTET] ON dbo.[F_ARTFOURNISS].[CT_Num] = dbo.[F_COMPTET].[CT_Num]
        WHERE 
            dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
    ) AS F ) AS Fournisseurs 
    ,
    (SELECT 
        COUNT(F_ARTICLE.AR_Ref)
        FROM dbo.F_ARTICLE 
        WHERE 
            dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('FRIPPE', 'BALLE')
                AND
            dbo.[F_ARTICLE].[Etat] != 'C'
                AND 
            dbo.[F_ARTICLE].[AR_PoidsBrut] > 0) AS Articles`
  )[0];
  const Users = await prisma.user.count();

  return {
    Users,
    ...art_fourniss,
  };
}

export async function fetchTopVente(by: "Qte_Vente" | "Montant_Dedouan", year: string) {
  if (by === "Qte_Vente")
    return await STE_miezaka.$queryRaw<BestSeller[]>`SELECT 
    Top(10)
        dbo.[F_DOCLIGNE].[AR_Ref],
        dbo.[F_ARTICLE].[AR_Design],
        dbo.[F_ARTICLE].[AR_PoidsBrut] * SUM([F_DOCLIGNE].[DL_Qte]) as Montant_Dedouan,
        SUM([F_DOCLIGNE].[DL_Qte]) AS Qte_Vente
    FROM dbo.[F_DOCLIGNE]
    JOIN dbo.[F_ARTICLE] 
    ON dbo.[F_DOCLIGNE].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
    WHERE
        dbo.[F_DOCLIGNE].[DO_Domaine] IN (0)
    AND dbo.F_DOCLIGNE.DO_Type IN (6,7)
    AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
    AND dbo.[F_ARTICLE].AR_PoidsNet > 0
    AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
    AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
    AND YEAR(dbo.[F_DOCLIGNE].[DO_Date]) = '2024' 
    GROUP BY
        dbo.[F_DOCLIGNE].AR_Ref,
        dbo.[F_ARTICLE].[AR_Design],
        dbo.[F_ARTICLE].[AR_PoidsBrut]
    ORDER BY
    Qte_Vente DESC`;
  else if (by === "Montant_Dedouan")
    return await STE_miezaka.$queryRaw<BestSeller[]>`SELECT 
        Top(10)
            dbo.[F_DOCLIGNE].[AR_Ref],
            dbo.[F_ARTICLE].[AR_Design],
            dbo.[F_ARTICLE].[AR_PoidsBrut] * SUM([F_DOCLIGNE].[DL_Qte]) as Montant_Dedouan,
            SUM([F_DOCLIGNE].[DL_Qte]) AS Qte_Vente
        FROM dbo.[F_DOCLIGNE]
        JOIN dbo.[F_ARTICLE] 
        ON dbo.[F_DOCLIGNE].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
        WHERE
            dbo.[F_DOCLIGNE].[DO_Domaine] IN (0)
        AND dbo.F_DOCLIGNE.DO_Type IN (6,7)
        AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
        AND dbo.[F_ARTICLE].AR_PoidsNet > 0
        AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
        AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
        AND YEAR(dbo.[F_DOCLIGNE].[DO_Date]) = '2024' 
        GROUP BY
            dbo.[F_DOCLIGNE].AR_Ref,
            dbo.[F_ARTICLE].[AR_Design],
            dbo.[F_ARTICLE].[AR_PoidsBrut]
        ORDER BY
        Montant_Dedouan DESC`;
  else return [];
}
