"use server";

import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";
import { Provider } from "../ste_definition";

export async function fetchEtats() {
  const etats: [] =
    await STE_miezaka.$queryRaw`SELECT DISTINCT dbo.[F_ARTICLE].[Etat] FROM [F_ARTICLE] WHERE [F_ARTICLE].[FA_CodeFamille] IN ('BALLE', 'FRIPPE') AND [Etat] NOT IN ('C', '')`;
  return etats.map((etat: Record<string, string>) => etat?.Etat);
}

export async function fetchFournisseurs() {
  return await STE_miezaka.$queryRaw<Provider[]>`
        SELECT 
    DISTINCT
    dbo.[F_ARTFOURNISS].[AF_Devise] AS Devise
    ,CASE 
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%PRO%' THEN  CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ' ,'PRO')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% O' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//O')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% T' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//T')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% N' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '//N')
      WHEN dbo.[F_ARTICLE].[AR_Ref] = 'TTR' THEN CONCAT('Ancien',' ',dbo.[F_COMPTET].[CT_Intitule])
        ELSE dbo.[F_COMPTET].[CT_Intitule]
    END  AS Nom_Fournisseur
    FROM dbo.F_ARTICLE 
    JOIN dbo.[F_DOCLIGNE] 
        ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].[AR_Ref]
    JOIN dbo.[F_ARTCLIENT] 
        ON dbo.[F_DOCLIGNE].AR_Ref = dbo.[F_ARTCLIENT].[AR_Ref] AND dbo.[F_ARTCLIENT].[AC_Categorie] = 3
    JOIN dbo.[F_ARTFOURNISS] 
        ON dbo.[F_ARTFOURNISS].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
    JOIN dbo.[F_COMPTET] ON dbo.[F_ARTFOURNISS].[CT_Num] = dbo.[F_COMPTET].[CT_Num]
    WHERE 
        dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
            AND
        dbo.[F_DOCLIGNE].[DO_Domaine] in (0,1,2)
            AND 
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7,16,17,26) 
        ORDER BY Nom_Fournisseur ASC;
    `;
}
