"use client";
import {
  calculateMarge_p100ForOneProvider,
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  calculateVente_p100,
  calculateVente_p100ForOneProvider,
  lowerThan15,
  parseDecimal,
} from "@/app/lib/utils";
import { clsx } from "clsx";
import { Fragment, useState } from "react";
import { CategorieBalle } from "@/app/lib/definition";

export default function TableBody({ rows }: { rows: any[] }) {
  const [isActive, setActive] = useState<number>();
  const rowsBySize: CategorieBalle = rows.reduce((acc: Array<any>, curr, i) => {
    const { Size } = curr.article;

    if (!acc[Size]) acc[Size] = [];

    acc[Size].push(curr);

    return acc;
  }, {});

  const rowsBySizeByProvider: CategorieBalle = {
    "GROSSE BALLE": rowsBySize["GROSSE BALLE"]?.reduce((acc, curr) => {
      const provider = curr.article.Nom_Fournisseur;

      if (!acc[provider]) acc[provider] = [];

      acc[provider].push(curr);
      return acc;
    }, {}),
    "PETITE BALLE": rowsBySize["PETITE BALLE"]?.reduce((acc, curr) => {
      const provider = curr.article.Nom_Fournisseur;

      if (!acc[provider]) acc[provider] = [];

      acc[provider].push(curr);
      return acc;
    }, {}),
  };

  function handleRowClick(i: number) {
    setActive(i);
  }

  return (
    <>
      <tbody className="text-end">
        {Object.entries(rowsBySizeByProvider).map(([category, dataInCategories], i1) => {
          const Vente_Qte_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalQteForOneProvider(data, "vente"));
          const Achat_Qte_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalQteForOneProvider(data, "achat"));
          const Stock_Qte_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalQteForOneProvider(data, "stock"));
          const Prod_Qte_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalQteForOneProvider(data, "production"));
          const Report_Qte_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalQteForOneProvider(data, "report"));
          const Achat_Poids_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalPoidsForOneProvider(data, "achat"));
          const Report_Poids_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalPoidsForOneProvider(data, "report"));
          const Stock_Poids_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalPoidsForOneProvider(data, "stock"));
          const Prod_Poids_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalPoidsForOneProvider(data, "production"));
          const Vente_Poids_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalPoidsForOneProvider(data, "vente"));
          const Report_MontAchat_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontAchatForOneProvider(data, "report"));
          const Achat_MontAchat_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontAchatForOneProvider(data, "achat"));
          const Vente_MontDedouan_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontDedouanForOneProvider(data, "vente"));
          const Achat_MontDedouan_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontDedouanForOneProvider(data, "achat"));
          const Report_MontDedouan_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontDedouanForOneProvider(data, "report"));
          const Stock_MontDedouan_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalMontDedouanForOneProvider(data, "stock"));
          const Vente_VenteReelle_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateTotalVenteReelForOneProvider(data, "vente"));
          const Vente_p100_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateVente_p100ForOneProvider(data));
          const Marge_p100_Category = Object.entries(rowsBySize).map(([useless, data]) => calculateMarge_p100ForOneProvider(data));
          const PU_Category = Object.entries(rowsBySize).map(([useless, data]) => calculate_PU_Provider(data));

          return (
            <Fragment key={i1}>
              <Fragment>
                {Object.entries(dataInCategories).map(([provider, rowsGrouped]: [string, any], i2) => {
                  const Vente_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "vente");
                  const Achat_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "achat");
                  const Stock_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "stock");
                  const Prod_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "production");
                  const Report_Qte_Provider = calculateTotalQteForOneProvider(rowsGrouped, "report");
                  const Achat_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "achat");
                  const Report_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "report");
                  const Stock_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "stock");
                  const Prod_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "production");
                  const Vente_Poids_Provider = calculateTotalPoidsForOneProvider(rowsGrouped, "vente");
                  const Report_MontAchat_Provider = calculateTotalMontAchatForOneProvider(rowsGrouped, "report");
                  const Achat_MontAchat_Provider = calculateTotalMontAchatForOneProvider(rowsGrouped, "achat");
                  const Vente_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "vente");
                  const Achat_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "achat");
                  const Report_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "report");
                  const Stock_MontDedouan_Provider = calculateTotalMontDedouanForOneProvider(rowsGrouped, "stock");
                  const Vente_VenteReelle_Provider = calculateTotalVenteReelForOneProvider(rowsGrouped, "vente");
                  const Vente_p100_Provider = calculateVente_p100ForOneProvider(rowsGrouped);
                  const Marge_p100_Provider = calculateMarge_p100ForOneProvider(rowsGrouped);
                  const PU_Provider = calculate_PU_Provider(rowsGrouped);

                  return (
                    <Fragment key={i2}>
                      {/* Article's rows */}
                      {rowsGrouped.map((row, i: number) => {
                        const Stock_Qte =
                          parseFloat(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);

                        const Vente_Poids = row.article?.AR_PoidsNet * (row.vente?.Qte ?? 0);
                        const Stock_Poids = parseFloat(parseDecimal(row.article?.AR_PoidsNet * Stock_Qte));
                        const Report_Poids = row.article?.AR_PoidsNet * (row.report?.Qte ?? 0);
                        const Achat_Poids = row.article?.AR_PoidsNet * (row.achat?.Qte ?? 0);
                        const Prod_Poids = (row.production?.Qte ?? 0) * row.article.AR_PoidsNet;

                        // Calcul % vente
                        const Vente_p100 = calculateVente_p100(Vente_Poids, Report_Poids, Achat_Poids, Prod_Poids);

                        // Calcul % marge
                        const Marge_p100 =
                          ((parseFloat(row.article.AC_PrixVen ?? 0) - parseFloat(row.article.AR_PoidsBrut ?? 0)) / parseFloat(row.article.AR_PoidsBrut ?? 0)) *
                          100;

                        return (
                          <tr
                            key={i}
                            onClick={() => handleRowClick(i)}
                            className={clsx("active:bg-amber-500 hover:bg-amber-200 hover:border hover:border-amber-200", {
                              "bg-amber-400": isActive == i,
                            })}
                          >
                            {/* Article */}
                            <td
                              className={clsx("border-orange-400 border", {
                                "text-red-vif": Marge_p100 < 0,
                              })}
                            >
                              {lowerThan15(Vente_p100)}
                            </td>
                            <td className="text-center ">{row.article.Etat}</td>
                            <td className="text-sm px-1 py-0">
                              <sub>{Stock_Poids >= 5000 ? "*" : ""}</sub>
                            </td>
                            <td className="text-start font-bold text-red-600">{row.article.AR_Ref}</td>
                            <td className="text-center">{parseDecimal(row.article.AR_PrixAch)}</td>
                            <td>{parseDecimal(row.article.AR_PoidsBrut)}</td>
                            <td>{parseDecimal(row.article.AC_PrixVen)}</td>
                            {/* Report */}
                            <td>{parseDecimal(row.report?.Qte)}</td>
                            <td>{parseDecimal(Report_Poids)}</td>
                            <td>{parseDecimal(Report_Poids * row.article.AR_PrixAch)}</td>
                            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.report?.Qte)}</td>
                            {/* Achats */}
                            <td>{parseDecimal(row.achat?.Qte)}</td>
                            <td>{parseDecimal(Achat_Poids)}</td>
                            <td>{parseDecimal(row.article?.AR_PrixAch * Achat_Poids)}</td>
                            <td>{parseDecimal(row.achat?.Qte * row.article?.AR_PoidsBrut)}</td>
                            {/* Production */}
                            <td>{parseDecimal(row.production?.Qte)}</td>
                            <td>{parseDecimal(Prod_Poids)}</td>
                            {/* Vente */}
                            <td>{parseDecimal(row.vente?.Qte)}</td>
                            <td>{parseDecimal(Vente_Poids)}</td>
                            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.vente?.Qte)}</td>
                            <td>{parseDecimal(row.vente?.Vente_Reelle)}</td>
                            {/* Stock */}
                            <td>{parseDecimal(Stock_Qte)}</td>
                            <td>{parseDecimal(Stock_Poids)}</td>
                            <td>{parseDecimal(row.article?.AR_PoidsBrut * Stock_Qte)}</td>
                            {/* %vente et Marge % */}
                            <td className="border-orange-400 border text-red">{Vente_p100.toFixed(2)}</td>
                            <td
                              className={clsx("border-orange-400 border ", {
                                "text-red-vif": Marge_p100 < 0,
                              })}
                            >
                              {Marge_p100.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-amber-700 text-start font-semibold">{provider}</td>
                        <td>{parseDecimal(PU_Provider)}</td>
                        <td></td>
                        <td></td>
                        {/* Report */}
                        <td>{parseDecimal(Report_Qte_Provider)}</td>
                        <td>{parseDecimal(Report_Poids_Provider)}</td>
                        <td>{parseDecimal(Report_MontAchat_Provider)}</td>
                        <td>{parseDecimal(Report_MontDedouan_Provider)}</td>
                        {/* Achat */}
                        <td>{parseDecimal(Achat_Qte_Provider)}</td>
                        <td>{parseDecimal(Achat_Poids_Provider)}</td>
                        <td>{parseDecimal(Achat_MontAchat_Provider)}</td>
                        <td>{parseDecimal(Achat_MontDedouan_Provider)}</td>
                        {/* Production */}
                        <td>{parseDecimal(Prod_Qte_Provider)}</td>
                        <td>{parseDecimal(Prod_Poids_Provider)}</td>
                        {/* Vente */}
                        <td>{parseDecimal(Vente_Qte_Provider)}</td>
                        <td>{parseDecimal(Vente_Poids_Provider)}</td>
                        <td>{parseDecimal(Vente_MontDedouan_Provider)}</td>
                        <td>{parseDecimal(Vente_VenteReelle_Provider)}</td>
                        {/* Stock */}
                        <td>{parseDecimal(Stock_Qte_Provider)}</td>
                        <td>{parseDecimal(Stock_Poids_Provider)}</td>
                        <td>{parseDecimal(Stock_MontDedouan_Provider)}</td>
                        {/* % vente and % marge */}
                        <td>{parseDecimal(Vente_p100_Provider)}</td>
                        <td>{parseDecimal(Marge_p100_Provider)}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </Fragment>
              {/* row category */}
              <tr className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
                <td></td>
                <td></td>
                <td></td>
                <td className="text-amber-700 text-start font-extrabold">{category}</td>
                <td>{parseDecimal(PU_Category[i1])}</td>
                <td></td>
                <td></td>
                {/* Report */}
                <td>{parseDecimal(Report_Qte_Category[i1])}</td>
                <td>{parseDecimal(Report_Poids_Category[i1])}</td>
                <td>{parseDecimal(Report_MontAchat_Category[i1])}</td>
                <td>{parseDecimal(Report_MontDedouan_Category[i1])}</td>
                {/* Achat */}
                <td>{parseDecimal(Achat_Qte_Category[i1])}</td>
                <td>{parseDecimal(Achat_Poids_Category[i1])}</td>
                <td>{parseDecimal(Achat_MontAchat_Category[i1])}</td>
                <td>{parseDecimal(Achat_MontDedouan_Category[i1])}</td>
                {/* Production */}
                <td>{parseDecimal(Prod_Qte_Category[i1])}</td>
                <td>{parseDecimal(Prod_Poids_Category[i1])}</td>
                {/* Vente */}
                <td>{parseDecimal(Vente_Qte_Category[i1])}</td>
                <td>{parseDecimal(Vente_Poids_Category[i1])}</td>
                <td>{parseDecimal(Vente_MontDedouan_Category[i1])}</td>
                <td>{parseDecimal(Vente_VenteReelle_Category[i1])}</td>
                {/* Stock */}
                <td>{parseDecimal(Stock_Qte_Category[i1])}</td>
                <td>{parseDecimal(Stock_Poids_Category[i1])}</td>
                <td>{parseDecimal(Stock_MontDedouan_Category[i1])}</td>
                {/* % vente and % marge */}
                <td>{parseDecimal(Vente_p100_Category[i1])}</td>
                <td>{parseDecimal(Marge_p100_Category[i1])}</td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </>
  );
}

function calculate_PU_Provider(rows: Array<any>) {
  const onlyPU = rows.map((row) => parseFloat(row.article.AR_PrixAch ?? 0));
  return onlyPU.reduce((acc, cur) => acc + cur, 0) / onlyPU.length;
}
