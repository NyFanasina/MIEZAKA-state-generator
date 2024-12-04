import {
  calculateMarge_p100ForOneProvider,
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  calculateVente_p100ForOneProvider,
  parseDecimal,
} from "@/app/lib/utils";
import { fetchDeviseFournisseur } from "@/app/lib/data/ste";

export default async function TableFoot({ rows }: { rows: any[] }) {
  // const devise_Fournisseur: any = await fetchDeviseFournisseur();
  const rowsByProvider = rows.reduce((acc: any, cur: any) => {
    const providername = cur.article.Nom_Fournisseur;

    if (!acc[providername]) acc[providername] = [];
    acc[providername].push(cur);
    return acc;
  }, {});

  function calculateValDedouanDev(rowsByProvider: any[], type: "report" | "achat" | "stock" | "vente" | "production") {
    const ValEnDevise = Object.entries(rowsByProvider).map(([provider, data]: [string, Array<any>]) => {
      let valDevise = 1;
      const AF_Devise = ["ATTAR", "ATTAR PRO"].filter((item: any) => item.Nom_Fournisseur === provider)[0]?.Devise;
      if (AF_Devise == 2) valDevise = 5000;
      return calculateTotalMontDedouanForOneProvider(data, type) / valDevise;
    });

    return ValEnDevise.reduce((acc, cur) => acc + cur, 0);
  }

  // TOTAL_GENERAL
  const Vente_Qte = calculateTotalQteForOneProvider(rows, "vente");
  const Achat_Qte = calculateTotalQteForOneProvider(rows, "achat");
  const Stock_Qte = calculateTotalQteForOneProvider(rows, "stock");
  const Prod_Qte = calculateTotalQteForOneProvider(rows, "production");
  const Report_Qte = calculateTotalQteForOneProvider(rows, "report");
  const Achat_Poids = calculateTotalPoidsForOneProvider(rows, "achat");
  const Report_Poids = calculateTotalPoidsForOneProvider(rows, "report");
  const Stock_Poids = calculateTotalPoidsForOneProvider(rows, "stock");
  const Prod_Poids = calculateTotalPoidsForOneProvider(rows, "production");
  const Vente_Poids = calculateTotalPoidsForOneProvider(rows, "vente");
  const Report_MontAchat = calculateTotalMontAchatForOneProvider(rows, "report");
  const Achat_MontAchat = calculateTotalMontAchatForOneProvider(rows, "achat");
  const Vente_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "vente");
  const Achat_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "achat");
  const Report_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "report");
  const Stock_MontDedouan = calculateTotalMontDedouanForOneProvider(rows, "stock");
  const Vente_VenteReelle = calculateTotalVenteReelForOneProvider(rows, "vente");
  const Vente_p100 = calculateVente_p100ForOneProvider(rows);
  const Marge_p100 = calculateMarge_p100ForOneProvider(rows);
  const PU_G = Achat_MontAchat / Achat_Poids;

  // V_VAL_DEDOUAN_DEV
  const PROD_TOTAL_VAL_ACH_DEVISE = calculateValAchDevise(rows, "production");
  const PROD_VAL_DEDOUAN_AR = calculateValDedouanAR(rows, "production");
  const STOCK_TOTAL_VAL_ACH_DEVISE = calculateValAchDevise(rows, "stock");
  const STOCK_VAL_DEDOUAN_AR = calculateValDedouanAR(rows, "stock");
  const REPORT_VAL_DEDOUAN_AR = calculateValDedouanAR(rows, "report");
  const VENTE_TOTAL_VAL_ACH_DEVISE = calculateValAchDevise(rows, "vente");
  const ACHAT_TOTAL_VAL_ACH_DEVISE = calculateValAchDevise(rows, "achat");
  const REPORT_TOTAL_VAL_ACH_DEVISE = calculateValAchDevise(rows, "report");
  const REPORT_VAL_DEDOUAN_DEV = calculateValDedouanDev(rowsByProvider, "report");
  const ACHAT_VAL_DEDOUAN_DEV = calculateValDedouanDev(rowsByProvider, "achat");
  const VENTE_VAL_DEDOUAN_DEV = calculateValDedouanDev(rowsByProvider, "vente");
  const STOCK_VAL_DEDOUAN_DEV = calculateValDedouanDev(rowsByProvider, "stock");
  const PROD_VAL_DEDOUAN_DEV = calculateValDedouanDev(rowsByProvider, "production");

  return (
    <tfoot className="text-end">
      <tr>
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">TOTAL GENERAL</td>
        <td className=" text-center">{parseDecimal(PU_G)}</td>
        <td className=""></td>
        <td className=""></td>
        {/* Repport */}
        <td className="">{parseDecimal(Report_Qte)}</td>
        <td className="">{parseDecimal(Report_Poids)}</td>
        <td className="">{parseDecimal(Report_MontAchat)}</td>
        <td className="">{parseDecimal(Report_MontDedouan)}</td>
        {/* Achat */}
        <td className="">{parseDecimal(Achat_Qte)}</td>
        <td className="">{parseDecimal(Achat_Poids)}</td>
        <td className="">{parseDecimal(Achat_MontAchat)}</td>
        <td className="">{parseDecimal(Achat_MontDedouan)}</td>
        {/* Production */}
        <td className="">{parseDecimal(Prod_Qte)}</td>
        <td className="">{parseDecimal(Prod_Poids)}</td>
        {/* Vente */}
        <td className="">{parseDecimal(Vente_Qte)}</td>
        <td className="">{parseDecimal(Vente_Poids)}</td>
        <td className="">{parseDecimal(Vente_MontDedouan)}</td>
        <td className="">{parseDecimal(Vente_VenteReelle)}</td>
        {/* Stock */}
        <td className="">{parseDecimal(Stock_Qte)}</td>
        <td className="">{parseDecimal(Stock_Poids)}</td>
        <td className="">{parseDecimal(Stock_MontDedouan)}</td>
        {/* vente % and marge % */}
        <td className="">{parseDecimal(Vente_p100)}</td>
        <td className="">{parseDecimal(Marge_p100)}</td>
      </tr>
      <tr>
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">TOTAL VAL ACH DEVISE</td>
        <td className=" text-center"></td>
        <td></td>
        <td></td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(REPORT_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(ACHAT_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={2} className="pe-1">
          {parseDecimal(PROD_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(VENTE_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={3} className="pe-1">
          {parseDecimal(STOCK_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td className=""></td>
        <td className=""></td>
      </tr>
      <tr>
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">TOTAL VAL DEDOUANE DEV</td>
        <td className=" text-center"></td>
        <td></td>
        <td></td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(REPORT_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={4} className="pe-1">
          {ACHAT_VAL_DEDOUAN_DEV}
        </td>
        <td colSpan={2} className="pe-1">
          {parseDecimal(PROD_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(VENTE_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={3} className="pe-1">
          {parseDecimal(STOCK_VAL_DEDOUAN_DEV)}
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr className="bg-green-300">
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">VALEUR DEDOUANEÉ AR</td>
        <td className=" text-center">{parseDecimal(PU_G)}</td>
        <td></td>
        <td></td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(REPORT_VAL_DEDOUAN_AR)}
        </td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(Achat_MontDedouan)}
        </td>
        <td colSpan={2} className="pe-1">
          {parseDecimal(PROD_VAL_DEDOUAN_AR)}
        </td>
        <td colSpan={4} className="pe-1">
          {parseDecimal(Vente_MontDedouan)}
        </td>
        <td colSpan={3} className="pe-1">
          {parseDecimal(STOCK_VAL_DEDOUAN_AR)}
        </td>
        <td className="text-center">{parseDecimal(Vente_p100)}</td>
        <td className="text-center">{parseDecimal(Marge_p100)}</td>
      </tr>
    </tfoot>
  );
}

function calculateValAchDevise(rows: any[], type: "production" | "report" | "vente" | "stock" | "achat") {
  if (type === "stock") {
    const onlyValDedouans = rows.map((row) => {
      const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);
      const Stock_poids = row.article?.AR_PoidsNet * Stock_Qte;
      return Stock_poids * row.article.AR_PrixAch;
    }); //poids * Pu
    return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyValDedouans = rows.map((row) => (row[type]?.Qte ?? 0) * row.article.AR_PoidsNet * row.article.AR_PrixAch); //poids * PU
  return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
}

function calculateValDedouanAR(rows: any[], type: "production" | "report" | "vente" | "stock") {
  if (type === "stock") {
    const onlyValDedouans = rows.map((row) => {
      const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);
      return Stock_Qte * row.article.AR_PoidsBrut;
    });
    return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
  }

  const onlyValDedouans = rows.map((row) => (row[type]?.Qte ?? 0) * row.article.AR_PoidsBrut);
  return onlyValDedouans.reduce((acc, cur) => acc + cur, 0);
}