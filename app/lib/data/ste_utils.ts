"use server";

import { prisma } from "@/prisma/client";
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
    CASE 
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

export async function fetchFournisseursAvecDevise() {
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

export async function fetchBestSellerByQte(year: string = "2024") {
  const res = await STE_miezaka.$queryRaw`SELECT 
        Top(10)
            dbo.[F_DOCLIGNE].[AR_Ref],
            dbo.[F_ARTICLE].[AR_Design],
            SUM(dbo.[F_DOCLIGNE].[DL_MontantTTC]) as Vente_Reelle,
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

  return JSON.parse(JSON.stringify(res));
}

export async function fetcthBestSellerByVente_Reel() {
  const res = await STE_miezaka.$queryRaw`SELECT 
    Top(10)
        dbo.[F_DOCLIGNE].[AR_Ref],
        dbo.[F_ARTICLE].[AR_Design],
        SUM(dbo.[F_DOCLIGNE].[DL_MontantTTC]) as Vente_Reelle,
        SUM([F_DOCLIGNE].[DL_Qte]) AS Qte_Vente
    FROM dbo.[F_DOCLIGNE]
    JOIN dbo.[F_ARTICLE] 
    ON dbo.[F_DOCLIGNE].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
    WHERE
        dbo.[F_DOCLIGNE].[DO_Domaine] IN (0)
    AND dbo.F_DOCLIGNE.DO_Type IN (6,7)
    AND F_ARTICLE.Etat != 'C'
    AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
    AND dbo.[F_ARTICLE].AR_PoidsNet > 0
    AND dbo.[F_ARTICLE].AR_PoidsBrut > 0
    AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
    AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
    AND YEAR(dbo.[F_DOCLIGNE].[DO_Date]) = '2024' 
    AND dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
    GROUP BY
        dbo.[F_DOCLIGNE].AR_Ref,
        dbo.[F_ARTICLE].[AR_Design],
        dbo.[F_ARTICLE].[AR_PoidsBrut]
    ORDER BY
    Vente_Reelle DESC`;

  return JSON.parse(JSON.stringify(res));
}

export async function fetchGlobalStatistic() {
  const res = await STE_miezaka.$queryRaw`SELECT
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (6,7) THEN dbo.[F_DOCLIGNE].[DL_Qte] ELSE 0
      END
  ) AS Qte_Vente,
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (6,7) THEN dbo.[F_DOCLIGNE].[DL_Qte] * [F_ARTICLE].[AR_PoidsBrut] ELSE 0
      END
  ) AS Montant_Vente,
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (16,17) THEN dbo.[F_DOCLIGNE].[DL_Qte]
      ELSE 0
  END) AS Qte_Achat,
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (16,17) THEN dbo.[F_DOCLIGNE].[DL_Qte] * [F_ARTICLE].[AR_PoidsBrut]
      ELSE 0
  END) AS Montant_Achat,
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 0 THEN dbo.[F_DOCLIGNE].[DL_Qte]
      ELSE 0
  END) AS Qte_Prod,
  SUM(
      CASE
          WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 0 THEN dbo.[F_DOCLIGNE].[DL_Qte]  * [F_ARTICLE].[AR_PoidsBrut]
      ELSE 0
  END) AS Montant_Prod,
  FORMAT(dbo.[F_DOCLIGNE].[DO_Date], 'yyyy-MM') as Mois
FROM dbo.[F_DOCLIGNE]
  JOIN dbo.[F_ARTICLE]
  ON dbo.[F_DOCLIGNE].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
WHERE
      dbo.[F_DOCLIGNE].[DO_Domaine] IN (0,1,2)
  AND dbo.[F_DOCLIGNE].[AR_Ref] IS NOT NULL
  AND dbo.[F_ARTICLE].[AR_PoidsNet] > 0
  AND dbo.[F_ARTICLE].[AR_PoidsBrut] > 0
  AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
  AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
  AND dbo.[F_DOCLIGNE].[DO_Date] >= DATEADD(MONTH, -11, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))
  AND dbo.[F_DOCLIGNE].[DO_Date] <= EOMONTH(GETDATE())
GROUP BY
          FORMAT(dbo.[F_DOCLIGNE].[DO_Date], 'yyyy-MM')
ORDER BY
      Mois ASC`;

  return JSON.parse(JSON.stringify(res));
}

export async function fetchStockStatic() {
  const res = await STE_miezaka.$queryRaw<Record<string, any>[]>`SELECT
  SUM(Qte_Prod + Qte_Achat + MouvEntree -MouveSortie - Qte_Vente) AS Qte,
  SUM(Montant_Prod + Montant_Achat + Montant_MouvEntree -Montant_MouveSortie - Montant_Vente) AS Montant
  FROM
  (
  SELECT
  DISTINCT
  dbo.[F_DOCLIGNE].AR_Ref,
  SUM(CASE
      WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 0 THEN dbo.[F_DOCLIGNE].[DL_Qte]
      WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 1 THEN -dbo.[F_DOCLIGNE].[DL_Qte]
      ELSE 0
      END) AS Qte_Prod,
  SUM(CASE
      WHEN dbo.F_DOCLIGNE.DO_Type IN (6,7) THEN dbo.[F_DOCLIGNE].[DL_Qte]
          ELSE 0
      END) AS Qte_Vente,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (16,17) THEN dbo.[F_DOCLIGNE].[DL_Qte]
          ELSE 0
      END) AS Qte_Achat,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (20) THEN dbo.[F_DOCLIGNE].[DL_Qte]
          ELSE 0
      END) AS MouvEntree,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (21) THEN dbo.[F_DOCLIGNE].[DL_Qte]
          ELSE 0
      END) AS MouveSortie,
      

  SUM(CASE
      WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 0 THEN dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
      WHEN dbo.F_DOCLIGNE.DO_Type = 26 AND dbo.[F_DOCLIGNE].DL_TNomencl = 1 THEN -dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
      ELSE 0
      END) AS Montant_Prod,
  SUM(CASE
      WHEN dbo.F_DOCLIGNE.DO_Type IN (6,7) THEN dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
          ELSE 0
      END) AS Montant_Vente,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (16,17) THEN dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
          ELSE 0
      END) AS Montant_Achat,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (20) THEN dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
          ELSE 0
      END) AS Montant_MouvEntree,
  SUM(CASE
          WHEN dbo.F_DOCLIGNE.DO_Type IN (21) THEN dbo.[F_DOCLIGNE].[DL_Qte] * dbo.[F_ARTICLE].AR_PoidsBrut
          ELSE 0
      END) AS Montant_MouveSortie

  FROM dbo.[F_DOCLIGNE]
  JOIN dbo.[F_ARTICLE] 
      ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].[AR_Ref]
  WHERE
          dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
              AND
          dbo.[F_ARTICLE].[Etat] != 'C'
              AND 
          dbo.[F_ARTICLE].[AR_PoidsBrut] > 0
              AND
          dbo.[F_DOCLIGNE].[DO_Domaine] IN (0,2,1)
          AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
          AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
          AND dbo.[F_DOCLIGNE].[Do_Date] <= GETDATE()
          AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
  GROUP BY
  dbo.[F_DOCLIGNE].AR_Ref

) AS Fango`;
  return res[0];
}
