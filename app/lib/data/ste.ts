// "use server";
import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";
import { calculateDayBefore } from "../utils";

export async function fecthArticles() {
  return await STE_miezaka.$queryRaw`SELECT 
    DISTINCT
     dbo.[F_ARTICLE].[AR_Ref]
    ,dbo.[F_ARTICLE].[Etat]                -- P+
    ,dbo.[F_ARTICLE].[AR_PrixAch]          -- Prix Unitaire achat  
    ,dbo.[F_ARTCLIENT].[AC_PrixVen]        -- PU gros
    ,dbo.[F_ARTICLE].[AR_PoidsNet]         -- Poid article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    ,dbo.[F_ARTICLE].[AR_PoidsBrut]         -- Poid article      
    ,dbo.[F_ARTICLE].[cbCreation]
    ,dbo.[F_ARTFOURNISS].[CT_Num]
    ,CASE 
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%PRO%' THEN  CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ' ,'PRO')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% O' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '/O')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% T' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '/T')
      WHEN dbo.[F_ARTICLE].[AR_Ref] LIKE '%TTR% N' THEN CONCAT(dbo.[F_COMPTET].[CT_Intitule], ' ', '/N')
      WHEN dbo.[F_ARTICLE].[AR_Ref] = 'TTR' THEN CONCAT('Ancien',' ',dbo.[F_COMPTET].[CT_Intitule])
        ELSE dbo.[F_COMPTET].[CT_Intitule]
    END    as Nom_Fournisseur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    FROM dbo.F_ARTICLE 
    JOIN dbo.[F_DOCLIGNE] 
        ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].[AR_Ref]
    JOIN dbo.[F_ARTCLIENT] 
        ON dbo.[F_DOCLIGNE].AR_Ref = dbo.[F_ARTCLIENT].[AR_Ref] AND dbo.[F_ARTCLIENT].[AC_Categorie] = 3
    JOIN dbo.[F_ARTFOURNISS] 
        ON dbo.[F_ARTFOURNISS].[AR_Ref] = dbo.[F_ARTICLE].[AR_Ref]
    JOIN dbo.[F_COMPTET] ON dbo.[F_ARTFOURNISS].[CT_Num] = dbo.[F_COMPTET].[CT_Num]
    WHERE 
        dbo.[F_ARTICLE].[Ref_Art] = 'PRO'
            AND 
        dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
            AND
        dbo.[F_DOCLIGNE].[DO_Domaine] in (0,1,2)
            AND 
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7,16,17,26) --AND dbo.[F_DOCLIGNE].[DL_Qte] >= 0
            AND 
        dbo.[F_ARTICLE].AR_Ref LIKE '%PRO%'
        ORDER BY Nom_Fournisseur ASC;
    `;
}

export async function fecthAchats(from: string, to: string) {
  return await STE_miezaka.$queryRaw`
        SELECT
        DISTINCT(dbo.[F_DOCLIGNE].[AR_Ref])
        ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Qte
        ,SUM(dbo.[F_DOCLIGNE].DL_MontantHT)
        FROM dbo.[F_DOCLIGNE] 
            JOIN dbo.[F_ARTICLE]
                ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].AR_Ref
        WHERE 
            dbo.[F_DOCLIGNE].[DO_Domaine] = 1 
                AND
            dbo.[F_DOCLIGNE].[DO_Type] in (16,17)
                AND 
            dbo.F_DOCLIGNE.AR_Ref IS NOT NULL
                AND 
            dbo.[F_DOCLIGNE].[DL_Qte] >= 0
                AND 
            dbo.[F_DOCLIGNE].[DO_Date] BETWEEN CAST(${from} as date) AND CAST(${to} as date)
        GROUP BY 
            dbo.F_DOCLIGNE.AR_Ref 
        ORDER BY AR_Ref ASC`;
}

export async function fetchVentes(from?: string, to?: string) {
  return await STE_miezaka.$queryRaw`
    SELECT
    DISTINCT(dbo.[F_DOCLIGNE].[AR_Ref])
    ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Qte
    ,SUM(dbo.[F_DOCLIGNE].[DL_MontantTTC]) as Vente_Reelle
    FROM dbo.[F_DOCLIGNE] 
        JOIN dbo.[F_ARTICLE]
            ON dbo.[F_ARTICLE].[AR_Ref] = dbo.[F_DOCLIGNE].[AR_Ref]
    WHERE 
        dbo.[F_DOCLIGNE].[DO_Domaine] = 0
            AND
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7)
            AND 
        dbo.[F_DOCLIGNE].[AR_Ref] IS NOT NULL
            AND 
        dbo.[F_DOCLIGNE].[DO_Date] BETWEEN CAST(${from} as date) AND CAST(${to} as date)
    GROUP BY 
        dbo.[F_DOCLIGNE].[AR_Ref] 
      ORDER BY [AR_Ref] ASC`;
}

export async function fetchProductions(from?: string, to?: string) {
  return await STE_miezaka.$queryRaw`SELECT 
        dbo.[F_DOCLIGNE].[AR_Ref],
        sum(dbo.[F_DOCLIGNE].[DL_Qte]) AS Qte
        FROM dbo.[F_DOCLIGNE] 
        WHERE 
            dbo.[F_DOCLIGNE].[DO_Domaine] = 2
                AND 
            dbo.[F_DOCLIGNE].[DL_Qte] >= 0 
                AND 
            dbo.[F_DOCLIGNE].[AR_Ref] IS NOT NULL
                AND 
            dbo.[F_DOCLIGNE].[DO_Type] = 26
                AND 
            dbo.[F_DOCLIGNE].[DO_Date] BETWEEN CAST(${from} as date) AND CAST(${to} as date)
        GROUP BY 
        dbo.[F_DOCLIGNE].[AR_Ref]
        ORDER BY 
            dbo.[F_DOCLIGNE].[AR_Ref]
        ASC;`;
}

export async function fetchReports(from: string) {
  const dayBefore = calculateDayBefore(from);

  return await STE_miezaka.$queryRaw`SELECT 
  AR_Ref
  ,Qte_Prod - Qte_Vente + Qte_Achat AS Qte
FROM
(
  SELECT 
  DISTINCT
  dbo.[F_DOCLIGNE].AR_Ref,
  SUM(CASE 
         WHEN dbo.F_DOCLIGNE.DO_Type = 26 THEN dbo.[F_DOCLIGNE].[DL_Qte]
         ELSE 0
      END) AS Qte_Prod,
  SUM(CASE 
         WHEN dbo.F_DOCLIGNE.DO_Type IN (6,7) THEN dbo.[F_DOCLIGNE].[DL_Qte]
         ELSE 0
      END) AS Qte_Vente,
  SUM(CASE 
         WHEN dbo.F_DOCLIGNE.DO_Type IN (16,17) THEN dbo.[F_DOCLIGNE].[DL_Qte]
         ELSE 0
      END) AS Qte_Achat
FROM dbo.[F_DOCLIGNE]
WHERE 
  dbo.[F_DOCLIGNE].[DO_Domaine] IN (0,2,1)
  AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
  --AND dbo.[F_DOCLIGNE].[DL_Qte] >= 0
  AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,26)
  AND dbo.[F_DOCLIGNE].[Do_Date] < CAST('2024-01-01' AS date) 
GROUP BY 
  dbo.[F_DOCLIGNE].AR_Ref

) AS Fango`;
}
