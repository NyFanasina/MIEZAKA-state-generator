import {
  calculateMarge_p100ForOneProvider,
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  calculateValAchDevise,
  calculateValDedouanAR,
  calculateVente_p100ForOneProvider,
  parseDecimal,
} from "@/app/lib/utils";
import { fetchDeviseFournisseur } from "@/app/lib/data/ste";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function TableFoot({ rows = [] }: { rows: any[] }) {
  const [devise_Fournisseur, setDevise_Fournisseur] = useState([]);
  useEffect(() => {
    (async () => {
      const devise_Fournisseur: any = await fetchDeviseFournisseur();
      setDevise_Fournisseur(devise_Fournisseur);
      console.log(devise_Fournisseur);
    })();
  }, []);
  const rowsByProvider = rows.reduce((acc: any, cur: any) => {
    const providername = cur.article.Nom_Fournisseur;

    if (!acc[providername]) acc[providername] = [];
    acc[providername].push(cur);
    return acc;
  }, {});

  function calculateValDedouanDev(rowsByProvider: any[], type: "report" | "achat" | "stock" | "vente" | "production") {
    const ValEnDevise = Object.entries(rowsByProvider).map(([provider, data]: [string, Array<any>]) => {
      let valDevise = 1;
      const AF_Devise = devise_Fournisseur.filter((item: any) => item.Nom_Fournisseur === provider)[0]?.Devise;
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
    <tfoot className="text-center">
      <tr>
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">TOTAL GENERAL</td>
        <td className=" text-center">{parseDecimal(PU_G)}</td>
        <td className=""></td>
        <td className=""></td>
        {/* Repport */}
        <td className="text-violet-950">{parseDecimal(Report_Qte)}</td>
        <td className="text-violet-950">{parseDecimal(Report_Poids)}</td>
        <td className="text-violet-950">{parseDecimal(Report_MontAchat)}</td>
        <td className="text-violet-950">{parseDecimal(Report_MontDedouan)}</td>
        {/* Achat */}
        <td className="text-emerald-900">{parseDecimal(Achat_Qte)}</td>
        <td className="text-emerald-900">{parseDecimal(Achat_Poids)}</td>
        <td className="text-emerald-900">{parseDecimal(Achat_MontAchat)}</td>
        <td className="text-emerald-900">{parseDecimal(Achat_MontDedouan)}</td>
        {/* Production */}
        <td className="text-orange-800">{parseDecimal(Prod_Qte)}</td>
        <td className="text-orange-800">{parseDecimal(Prod_Poids)}</td>
        {/* Vente */}
        <td className="text-blue-800">{parseDecimal(Vente_Qte)}</td>
        <td className="text-blue-800">{parseDecimal(Vente_Poids)}</td>
        <td className="text-blue-800">{parseDecimal(Vente_MontDedouan)}</td>
        <td className="text-blue-800">{parseDecimal(Vente_VenteReelle)}</td>
        {/* Stock */}
        <td>{parseDecimal(Stock_Qte)}</td>
        <td>{parseDecimal(Stock_Poids)}</td>
        <td>{parseDecimal(Stock_MontDedouan)}</td>
        {/* vente % and marge % */}
        <td className="text-blue-800">{parseDecimal(Vente_p100)}</td>
        <td
          className={clsx("border-orange-400 border", {
            "text-red-vif": Marge_p100 < 0,
            "text-blue-800": Marge_p100 > 0,
          })}
        >
          {parseDecimal(Marge_p100)}
        </td>
      </tr>
      <tr>
        <td colSpan={3} className="border-none"></td>
        <td className=" text-start">TOTAL VAL ACH DEVISE</td>
        <td className=" text-center"></td>
        <td></td>
        <td></td>
        <td colSpan={4} className="pe-1 text-violet-950">
          {parseDecimal(REPORT_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={4} className="pe-1 text-emerald-900">
          {parseDecimal(ACHAT_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={2} className="pe-1 text-orange-800">
          {parseDecimal(PROD_TOTAL_VAL_ACH_DEVISE)}
        </td>
        <td colSpan={4} className="pe-1 text-blue-800">
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
        <td colSpan={4} className="pe-1 text-violet-950">
          {parseDecimal(REPORT_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={4} className="pe-1 text-emerald-900">
          {parseDecimal(ACHAT_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={2} className="pe-1 text-orange-800">
          {parseDecimal(PROD_VAL_DEDOUAN_DEV)}
        </td>
        <td colSpan={4} className="pe-1 text-blue-800">
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
        <td colSpan={4} className="pe-1 text-violet-950">
          {parseDecimal(REPORT_VAL_DEDOUAN_AR)}
        </td>
        <td colSpan={4} className="pe-1 text-emerald-900">
          {parseDecimal(Achat_MontDedouan)}
        </td>
        <td colSpan={2} className="pe-1 text-orange-800">
          {parseDecimal(PROD_VAL_DEDOUAN_AR)}
        </td>
        <td colSpan={4} className="pe-1 text-blue-800">
          {parseDecimal(Vente_MontDedouan)}
        </td>
        <td colSpan={3} className="pe-1">
          {parseDecimal(STOCK_VAL_DEDOUAN_AR)}
        </td>
        <td className="text-center text-blue-800">{parseDecimal(Vente_p100)}</td>
        <td
          className={clsx("border-orange-400 border text-center", {
            "text-red-vif": Marge_p100 < 0,
            "text-blue-800": Marge_p100 > 0,
          })}
        >
          {parseDecimal(Marge_p100)}
        </td>
      </tr>
    </tfoot>
  );
}
