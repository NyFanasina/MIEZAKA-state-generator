// "use server";
import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";
import { calculateDayBefore } from "../utils";

export async function fecthArticles(from?: string, to?: string) {
  // search between dates
  if (from && to)
    return await STE_miezaka.$queryRaw`SELECT 
        DISTINCT
        dbo.[F_ARTICLE].[AR_Ref]
        ,dbo.[F_ARTICLE].[Etat]                -- P+
        ,dbo.[F_ARTICLE].[AR_PrixAch]          -- Prix Unitaire achat  
        ,dbo.[F_ARTICLE].[Prix_Revient]        -- PU Revient
        ,dbo.[F_ARTCLIENT].[AC_PrixVen]        -- PU gros
        ,dbo.[F_ARTICLE].[AR_PoidsNet]         -- Poid article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        ,dbo.[F_ARTICLE].[AR_PoidsBrut]         -- Poid article                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        FROM dbo.F_ARTICLE 
        JOIN dbo.[F_DOCLIGNE] 
        ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].AR_Ref
        JOIN dbo.[F_ARTCLIENT] 
        ON dbo.[F_DOCLIGNE].AR_Ref = dbo.[F_ARTCLIENT].[AR_Ref] AND dbo.[F_ARTCLIENT].[AC_Categorie] = 3
        WHERE 
        dbo.[F_DOCLIGNE].[DO_Domaine] in (0,1,2)
        AND 
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7,16,17,26) AND dbo.[F_DOCLIGNE].[DL_Qte] > 0
        AND 
        dbo.[F_ARTICLE].[AR_Ref] LIKE '%PRO45K'
        `;
}

export async function fecthAchats() {
  return await STE_miezaka.$queryRaw`
        SELECT
        DISTINCT(dbo.[F_DOCLIGNE].[AR_Ref])
        ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Achat_Qte
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
        GROUP BY 
            dbo.F_DOCLIGNE.AR_Ref 
        ORDER BY AR_Ref ASC`;
}

export async function fetchVentes() {
  return await STE_miezaka.$queryRaw`
    SELECT
    DISTINCT(dbo.[F_DOCLIGNE].[AR_Ref])
    ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Vente_Qte
    ,SUM(dbo.[F_DOCLIGNE].DL_MontantHT) as Vente_Reel
    FROM dbo.[F_DOCLIGNE] 
        JOIN dbo.[F_ARTICLE]
            ON dbo.[F_ARTICLE].AR_Ref = dbo.[F_DOCLIGNE].AR_Ref
    WHERE 
        dbo.[F_DOCLIGNE].[DO_Domaine] = 0
            AND
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7)
            AND 
        dbo.F_DOCLIGNE.AR_Ref IS NOT NULL
            AND 
        dbo.[F_DOCLIGNE].[DL_Qte] >= 0
    GROUP BY 
        dbo.F_DOCLIGNE.AR_Ref 
      ORDER BY AR_Ref ASC`;
}

export async function fetchProductions() {
  return await STE_miezaka.$queryRaw`SELECT 
        dbo.F_DOCLIGNE.AR_Ref,
        sum(dbo.F_DOCLIGNE.DL_Qte) AS Prod_Qte
        FROM dbo.[F_DOCLIGNE] 
        WHERE 
            dbo.[F_DOCLIGNE].[DO_Domaine] = 2
                AND 
            dbo.[F_DOCLIGNE].[DL_Qte] >= 0 
                AND 
            dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
                AND 
            dbo.[F_DOCLIGNE].DO_Type = 26
                AND 
            dbo.[F_DOCLIGNE].[DL_Qte] != 1
        GROUP BY 
        dbo.F_DOCLIGNE.AR_Ref
        ORDER BY 
            dbo.F_DOCLIGNE.AR_Ref
        ASC;`;
}

export async function fetchStock() {
  return await STE_miezaka.$queryRaw`SELECT 
    AR_Ref
   ,SUM(AS_QteSto) AS Stock_Qte
   FROM 
       F_ARTSTOCK
   WHERE 
       AS_Mouvemente = 1  
   GROUP BY 
       AR_Ref;`;
}

export async function fetchReports(from: string) {
  const dayBefore = calculateDayBefore(from);

  return await STE_miezaka.$queryRaw`SELECT 
    dbo.F_DOCLIGNE.AR_Ref,
    sum(dbo.F_DOCLIGNE.DL_Qte) AS Report_Qte
    FROM dbo.[F_DOCLIGNE] 
    WHERE 
        dbo.[F_DOCLIGNE].[DO_Domaine] in (1,2)
            AND 
        dbo.[F_DOCLIGNE].[DL_Qte] >= 0 
            AND 
        dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
            AND 
        dbo.[F_DOCLIGNE].DO_Type in (16,17)
            AND 
        dbo.[F_DOCLIGNE].[DL_Qte] != 1
        AND
        dbo.[F_DOCLIGNE].[Do_Date]  = CAST(${dayBefore} as date) 
    GROUP BY 
    dbo.F_DOCLIGNE.AR_Ref
    ORDER BY 
        dbo.F_DOCLIGNE.AR_Ref
    ASC;`;
}
