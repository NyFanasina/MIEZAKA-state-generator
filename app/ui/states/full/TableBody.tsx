import {
  calculate_PU_Provider,
  calculateMarge_p100,
  calculateMarge_p100ForOneProvider,
  calculateMontAchat,
  calculateMontDedouan,
  calculatePoids,
  calculatePoidsStock,
  calculateQteStock,
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  calculateVente_p100,
  calculateVente_p100ForOneProvider,
  groupByCategory,
  GroupByProvider,
  groupBySizeByProvider,
  lowerThan15,
  parseDecimal,
} from "@/app/lib/utils";
import { clsx } from "clsx";
import { Fragment, memo, MouseEvent, useEffect, useMemo, useState } from "react";
import { ByCategory, Mouvement, SizeBalle } from "@/app/lib/ste_definition";

export default function TableBody({ rows = [] }: { rows: Mouvement[] }) {
  const rowsBySize: ByCategory | any = groupByCategory(rows);
  const rowsBySizeByProvider = groupBySizeByProvider(rowsBySize);

  return (
    <>
      <tbody className="text-end font-semibold">
        {Object.entries(rowsBySizeByProvider).map(([category, dataInCategories], i1) => {
          const Vente_Qte_Category = calculateTotalQteForOneProvider(rowsBySize[category], "vente");
          const Stock_Qte_Category = calculateTotalQteForOneProvider(rowsBySize[category], "stock");
          const Achat_Qte_Category = calculateTotalQteForOneProvider(rowsBySize[category], "achat");
          const Prod_Qte_Category = calculateTotalQteForOneProvider(rowsBySize[category], "production");
          const Report_Qte_Category = calculateTotalQteForOneProvider(rowsBySize[category], "report");
          const Achat_Poids_Category = calculateTotalPoidsForOneProvider(rowsBySize[category], "achat");
          const Report_Poids_Category = calculateTotalPoidsForOneProvider(rowsBySize[category], "report");
          const Stock_Poids_Category = calculateTotalPoidsForOneProvider(rowsBySize[category], "stock");
          const Prod_Poids_Category = calculateTotalPoidsForOneProvider(rowsBySize[category], "production");
          const Vente_Poids_Category = calculateTotalPoidsForOneProvider(rowsBySize[category], "vente");
          const Report_MontAchat_Category = calculateTotalMontAchatForOneProvider(rowsBySize[category], "report");
          const Achat_MontAchat_Category = calculateTotalMontAchatForOneProvider(rowsBySize[category], "achat");
          const Vente_MontDedouan_Category = calculateTotalMontDedouanForOneProvider(rowsBySize[category], "vente");
          const Achat_MontDedouan_Category = calculateTotalMontDedouanForOneProvider(rowsBySize[category], "achat");
          const Report_MontDedouan_Category = calculateTotalMontDedouanForOneProvider(rowsBySize[category], "report");
          const Stock_MontDedouan_Category = calculateTotalMontDedouanForOneProvider(rowsBySize[category], "stock");
          const Vente_VenteReelle_Category = calculateTotalVenteReelForOneProvider(rowsBySize[category], "vente");
          const Vente_p100_Category = calculateVente_p100ForOneProvider(rowsBySize[category]);
          const Marge_p100_Category = calculateMarge_p100ForOneProvider(rowsBySize[category]);
          const PU_Category = calculate_PU_Provider(rowsBySize[category]);

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
                    <>
                      <Fragment key={i2}>
                        {/* Article's rows */}
                        {rowsGrouped.map((row: Mouvement, i: number) => {
                          const Stock_Qte = calculateQteStock(row);
                          const Vente_Poids = calculatePoids(row, "vente");
                          const Stock_Poids = calculatePoidsStock(row);
                          const Report_Poids = calculatePoids(row, "report");
                          const Achat_Poids = calculatePoids(row, "achat");
                          const Prod_Poids = calculatePoids(row, "production");
                          const Report_MontDedouan = calculateMontDedouan(row, "report");
                          const Report_MontAchat = calculateMontAchat(row, "report");

                          // Calcul % vente
                          const Vente_p100 = calculateVente_p100(row);

                          // Calcul % marge
                          const Marge_p100 = calculateMarge_p100(row);

                          return (
                            <>
                              <tr key={i} onClick={handleRowTableClick} className="active:bg-amber-300 hover:bg-amber-200 hover:border">
                                {/* Article */}
                                <td
                                  className={clsx("border-orange-400 border text-center", {
                                    "text-red-vif": Marge_p100 < 0,
                                  })}
                                >
                                  {lowerThan15(Vente_p100)}
                                </td>
                                <td className="text-center ">{row.article.Etat}</td>
                                <td className="text-sm px-[2px] py-0">
                                  <sub>{Stock_Poids >= 5000 ? "*" : ""}</sub>
                                </td>
                                <td
                                  className={clsx("text-start font-bold", {
                                    "text-red-600": Marge_p100 < 0,
                                    "bg-pink-200": Stock_Poids >= 5000 && Marge_p100 < 0,
                                  })}
                                >
                                  <span title={row.article.AR_Design}>{row.article.AR_Ref}</span>
                                </td>
                                <td className="text-center">{parseDecimal(row.article.AR_PrixAch)}</td>
                                <td>{parseDecimal(row.article.AR_PoidsBrut)}</td>
                                <td>{parseDecimal(row.article.AC_PrixVen)}</td>
                                {/* Report */}
                                <td className="text-violet-950">{parseDecimal(row.report?.Qte)}</td>
                                <td className="text-violet-950">{parseDecimal(Report_Poids)}</td>
                                <td className="text-violet-950">{parseDecimal(Report_MontAchat)}</td>
                                <td className="text-violet-950">{parseDecimal(Report_MontDedouan)}</td>
                                {/* Achats */}
                                <td className="text-green-900">{parseDecimal(row.achat?.Qte)}</td> {/* misy vide */}
                                <td className="text-emerald-900">{parseDecimal(Achat_Poids)}</td>
                                <td className="text-emerald-900">{parseDecimal(row.article?.AR_PrixAch * Achat_Poids)}</td>
                                <td className="text-emerald-900">{parseDecimal(calculateMontDedouan(row, "achat"))}</td>
                                {/* Production */}
                                <td className="text-orange-800">{parseDecimal(row.production?.Qte)}</td>
                                <td className="text-orange-800">{parseDecimal(Prod_Poids)}</td>
                                {/* Vente */}
                                <td className="text-blue-800">{parseDecimal(row.vente?.Qte)}</td>
                                <td className="text-blue-800">{parseDecimal(Vente_Poids)}</td>
                                <td className="text-blue-800">{parseDecimal(calculateMontDedouan(row, "vente"))}</td>
                                <td className="text-blue-800">{parseDecimal(row.vente?.Vente_Reelle)}</td>
                                {/* Stock */}
                                <td>{parseDecimal(Stock_Qte)}</td>
                                <td>{parseDecimal(Stock_Poids)}</td>
                                <td>{parseDecimal(row.article.AR_PoidsBrut * Stock_Qte)}</td>
                                {/* %vente et Marge % */}
                                <td className="border-orange-400 border text-blue-800">{parseDecimal(Vente_p100)}</td>
                                <td
                                  className={clsx("border-orange-400 border", {
                                    "text-red-vif": Marge_p100 < 0,
                                    "text-blue-800": Marge_p100 > 0,
                                  })}
                                >
                                  {parseDecimal(Marge_p100)}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-amber-700 text-start font-semibold">{provider}</td>
                          <td className="text-center">{parseDecimal(PU_Provider)}</td>
                          <td></td>
                          <td></td>
                          {/* Report */}
                          <td className="text-violet-950">{parseDecimal(Report_Qte_Provider)}</td>
                          <td className="text-violet-950">{parseDecimal(Report_Poids_Provider)}</td>
                          <td className="text-violet-950">{parseDecimal(Report_MontAchat_Provider)}</td>
                          <td className="text-violet-950">{parseDecimal(Report_MontDedouan_Provider)}</td>
                          {/* Achat */}
                          <td className="text-emerald-900">{parseDecimal(Achat_Qte_Provider)}</td>
                          <td className="text-emerald-900">{parseDecimal(Achat_Poids_Provider)}</td>
                          <td className="text-emerald-900">{parseDecimal(Achat_MontAchat_Provider)}</td>
                          <td className="text-emerald-900">{parseDecimal(Achat_MontDedouan_Provider)}</td>
                          {/* Production */}
                          <td className="text-orange-800">{parseDecimal(Prod_Qte_Provider)}</td>
                          <td className="text-orange-800">{parseDecimal(Prod_Poids_Provider)}</td>
                          {/* Vente */}
                          <td className="text-blue-800">{parseDecimal(Vente_Qte_Provider)}</td>
                          <td className="text-blue-800">{parseDecimal(Vente_Poids_Provider)}</td>
                          <td className="text-blue-800">{parseDecimal(Vente_MontDedouan_Provider)}</td>
                          <td className="text-blue-800">{parseDecimal(Vente_VenteReelle_Provider)}</td>
                          {/* Stock */}
                          <td>{parseDecimal(Stock_Qte_Provider)}</td>
                          <td>{parseDecimal(Stock_Poids_Provider)}</td>
                          <td>{parseDecimal(Stock_MontDedouan_Provider)}</td>
                          {/* % vente and % marge */}
                          <td className="text-blue-800">{parseDecimal(Vente_p100_Provider)}</td>
                          <td
                            className={clsx("border-orange-400 border ", {
                              "text-red-vif": Marge_p100_Provider < 0,
                              "text-blue-800": Marge_p100_Provider > 0,
                            })}
                          >
                            {parseDecimal(Marge_p100_Provider)}
                          </td>
                        </tr>
                      </Fragment>
                      {Object.entries(dataInCategories).length - 1 != i2 && <tr className={clsx("h-3")} />}
                    </>
                  );
                })}
              </Fragment>
              {/* row category */}
              {rowsBySize[category] && (
                <tr className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-amber-700 text-start font-extrabold">{category}</td>
                  <td className="text-center">{parseDecimal(PU_Category)}</td>
                  <td></td>
                  <td></td>
                  {/* Report */}
                  <td className="text-violet-950">{parseDecimal(Report_Qte_Category)}</td>
                  <td className="text-violet-950">{parseDecimal(Report_Poids_Category)}</td>
                  <td className="text-violet-950">{parseDecimal(Report_MontAchat_Category)}</td>
                  <td className="text-violet-950">{parseDecimal(Report_MontDedouan_Category)}</td>
                  {/* Achat */}
                  <td className="text-emerald-900">{parseDecimal(Achat_Qte_Category)}</td>
                  <td className="text-emerald-900">{parseDecimal(Achat_Poids_Category)}</td>
                  <td className="text-emerald-900">{parseDecimal(Achat_MontAchat_Category)}</td>
                  <td className="text-emerald-900">{parseDecimal(Achat_MontDedouan_Category)}</td>
                  {/* Production */}
                  <td className="text-orange-800">{parseDecimal(Prod_Qte_Category)}</td>
                  <td className="text-orange-800">{parseDecimal(Prod_Poids_Category)}</td>
                  {/* Vente */}
                  <td className="text-blue-800">{parseDecimal(Vente_Qte_Category)}</td>
                  <td className="text-blue-800">{parseDecimal(Vente_Poids_Category)}</td>
                  <td className="text-blue-800">{parseDecimal(Vente_MontDedouan_Category)}</td>
                  <td className="text-blue-800">{parseDecimal(Vente_VenteReelle_Category)}</td>
                  {/* Stock */}
                  <td>{parseDecimal(Stock_Qte_Category)}</td>
                  <td>{parseDecimal(Stock_Poids_Category)}</td>
                  <td>{parseDecimal(Stock_MontDedouan_Category)}</td>
                  {/* % vente and % marge */}
                  <td className="text-blue-800">{parseDecimal(Vente_p100_Category)}</td>
                  <td
                    className={clsx("border-orange-400 border", {
                      "text-red-vif": Marge_p100_Category < 0,
                      "text-blue-800": Marge_p100_Category > 0,
                    })}
                  >
                    {parseDecimal(Marge_p100_Category)}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </>
  );
}

export async function handleRowTableClick(event: MouseEvent<HTMLTableRowElement>) {
  const higthlighted = document.getElementsByClassName("hightlight")[0];
  if (higthlighted) higthlighted.classList.remove("hightlight");
  event.currentTarget.classList.add("hightlight");
}
