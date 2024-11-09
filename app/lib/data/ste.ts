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
    dbo.[F_DOCLIGNE].[DO_Domaine] in (0,1,2)
        AND 
    dbo.[F_DOCLIGNE].[DO_Type] in (6,7,16,17,26) AND dbo.[F_DOCLIGNE].[DL_Qte] > 0
        AND
    dbo.[F_DOCLIGNE].[cbCreation] BETWEEN CAST('01-01-2024' as date) AND CAST('18-07-2024'as date)
        AND dbo.[F_ARTICLE].AR_Ref LIKE '%PRO20%'
    ORDER BY Nom_Fournisseur ASC;
    `;
}

export async function fecthAchats(from: string, to: string) {
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
    ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Vente_Qte
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
        dbo.[F_DOCLIGNE].[DL_Qte] >= 0
            AND 
        dbo.[F_DOCLIGNE].[DO_Date] BETWEEN CAST(${from} as date) AND CAST(${to} as date)
    GROUP BY 
        dbo.[F_DOCLIGNE].[AR_Ref] 
      ORDER BY [AR_Ref] ASC`;
}

export async function fetchProductions(from?: string, to?: string) {
  return await STE_miezaka.$queryRaw`SELECT 
        dbo.[F_DOCLIGNE].[AR_Ref],
        sum(dbo.[F_DOCLIGNE].[DL_Qte]) AS Prod_Qte
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
    dbo.[F_DOCLIGNE].[AR_Ref],
    CAST(sum(dbo.[F_DOCLIGNE].[DL_Qte]) as INT) AS Report_Qte
    FROM dbo.[F_DOCLIGNE] 
    WHERE 
        dbo.[F_DOCLIGNE].[DO_Domaine] in (1,2)
            AND 
        dbo.[F_DOCLIGNE].[DL_Qte] >= 0 
            AND 
        dbo.[F_DOCLIGNE].[AR_Ref] IS NOT NULL
            AND 
        dbo.[F_DOCLIGNE].[DO_Type] in (16,17,26)
            AND
        dbo.[F_DOCLIGNE].[Do_Date]  < CAST(${dayBefore} as date) 
    GROUP BY 
        dbo.[F_DOCLIGNE].[AR_Ref]
    ORDER BY 
        dbo.[F_DOCLIGNE].[AR_Ref]
    ASC;`;
}
