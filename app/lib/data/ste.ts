"use server";
import { STE_miezaka } from "@/prisma/clientSTE_Miezaka";
import { calculateDayBefore } from "../utils";
import { Mouvement } from "../ste_definition";
import { SearchParamsStatesProps } from "@/app/(views)/states/full/page";

export async function fecthArticles(to?: string) {
  const article = await STE_miezaka.$queryRaw`SELECT 
    DISTINCT
     dbo.[F_ARTICLE].[AR_Ref]
    ,dbo.[F_ARTICLE].[AR_Design]           
    ,dbo.[F_ARTICLE].[Etat]                -- P+
    ,dbo.[F_ARTICLE].[AR_PrixAch]          -- Prix Unitaire achat
    ,dbo.[F_ARTCLIENT].[AC_PrixVen]        -- PU gros
    ,dbo.[F_ARTICLE].[AR_PoidsNet]         -- Poid article
    ,dbo.[F_ARTICLE].[AR_PoidsBrut]        -- Poid article      
    ,dbo.[F_ARTICLE].[cbCreation]
    ,dbo.[F_ARTFOURNISS].[CT_Num]
    ,dbo.[F_ARTFOURNISS].[AF_Devise]
    ,
    CASE 
      WHEN dbo.[F_ARTICLE].AR_PoidsNet = 1 OR dbo.[F_ARTICLE].AR_PoidsNet >= 100 THEN 'GROSSE BALLE'
      WHEN dbo.[F_ARTICLE].AR_PoidsNet < 100 THEN 'PETITE BALLE'
    END AS [Size]           
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
      --   dbo.[F_ARTICLE].[Ref_Art] = 'PRO'
      --       AND 
        dbo.[F_ARTICLE].[FA_CodeFamille] IN  ('BALLE', 'FRIPPE')
            AND
        dbo.[F_ARTICLE].[Etat] != 'C'
            AND 
        dbo.[F_ARTICLE].[AR_PoidsBrut] > 0
            AND
        dbo.[F_DOCLIGNE].[DO_Domaine] in (0,1,2)
            AND 
        dbo.[F_DOCLIGNE].[DO_Type] in (6,7,16,17,26) --AND dbo.[F_DOCLIGNE].[DL_Qte] >= 0 
            AND 
        dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
        --     AND
        -- dbo.[F_COMPTET].[CT_Intitule] = 'ATTAR'
            AND
            dbo.[F_ARTICLE].[cbCreation] <= CAST(${to} as date)
        ORDER BY Nom_Fournisseur ASC;
    `;
  return JSON.parse(JSON.stringify(article));
}

export async function fecthAchats(from: string, to: string) {
  return await STE_miezaka.$queryRaw`
        SELECT
        DISTINCT(dbo.[F_DOCLIGNE].[AR_Ref])
        ,SUM(dbo.[F_DOCLIGNE].[DL_Qte]) as Qte
        ,SUM(dbo.[F_DOCLIGNE].[DL_MontantHT])
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
            dbo.[F_DOCLIGNE].DL_TNomencl = 0 
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
,Qte_Prod + Qte_Achat + MouvEntree -MouveSortie - Qte_Vente AS Qte
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
      END) AS MouveSortie
  FROM dbo.[F_DOCLIGNE]
  WHERE
          dbo.[F_DOCLIGNE].[DO_Domaine] IN (0,2,1)
          AND dbo.[F_DOCLIGNE].AR_Ref IS NOT NULL
          --AND dbo.[F_DOCLIGNE].[DL_Qte] >= 0
          AND dbo.[F_DOCLIGNE].[DO_Type] IN (6,7,16,17,20,21,26)
          AND dbo.[F_DOCLIGNE].[Do_Date] < CAST(${from} AS date) 
          AND dbo.[F_DOCLIGNE].[DE_No] NOT IN (18,29,31,38,39,47,50)
  GROUP BY
  dbo.[F_DOCLIGNE].AR_Ref

  ) AS Fango`;
}

export async function fetchDeviseFournisseur() {
  return await STE_miezaka.$queryRaw`
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
        --     AND 
        -- dbo.[F_COMPTET].[CT_Intitule] = 'ATTAR'
        ORDER BY Nom_Fournisseur ASC;
    `;
}

export default async function fetchRows(searchParams: SearchParamsStatesProps["searchParams"]) {
  const articles = await fecthArticles(searchParams?.to);
  const reports = await fetchReports(searchParams?.from);
  const achats = await fecthAchats(searchParams?.from, searchParams?.to);
  const ventes = await fetchVentes(searchParams?.from, searchParams?.to);
  const productions = await fetchProductions(searchParams?.from, searchParams?.to);

  const data: Array<Mouvement> = await articles.map((article: any) => {
    return {
      article,
      achat: achats.filter((achat) => achat.AR_Ref == article.AR_Ref)[0],
      vente: ventes.filter((vente) => vente.AR_Ref == article.AR_Ref)[0],
      production: productions.filter((prod) => prod.AR_Ref == article.AR_Ref)[0],
      report: reports.filter((report) => report.AR_Ref == article.AR_Ref)[0],
    };
  });

  return JSON.parse(JSON.stringify(data));
}
