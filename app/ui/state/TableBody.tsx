import {
  calculateTotalMontAchatForOneProvider,
  calculateTotalMontDedouanForOneProvider,
  calculateTotalPoidsForOneProvider,
  calculateTotalQteForOneProvider,
  calculateTotalVenteReelForOneProvider,
  lowerThan15,
  parseDecimal,
} from "@/app/lib/utils";
import { DateSearchParamsProps } from "@/app/(views)/states/page";
import { fecthAchats, fecthArticles, fetchProductions, fetchReports, fetchVentes } from "@/app/lib/data/ste";
import { clsx } from "clsx";
import { Fragment } from "react";
import TableFoot from "./TableFoot";

export default async function TableBody({ searchParams }: DateSearchParamsProps) {
  const articles = await fecthArticles();
  const reports = await fetchReports(searchParams?.from);
  const achats = await fecthAchats(searchParams?.from, searchParams?.to);
  const ventes = await fetchVentes(searchParams?.from, searchParams?.to);
  const productions = await fetchProductions(searchParams?.from, searchParams?.to);

  const rows: Array<any> = await articles.map((article: any) => {
    return {
      article,
      achat: achats.filter((achat) => achat.AR_Ref == article.AR_Ref)[0],
      vente: ventes.filter((vente) => vente.AR_Ref == article.AR_Ref)[0],
      production: productions.filter((prod) => prod.AR_Ref == article.AR_Ref)[0],
      report: reports.filter((report) => report.AR_Ref == article.AR_Ref)[0],
    };
  });

  const rowsByFournisseur = await rows.reduce((acc: Array<any>, curr, i) => {
    const fournisseur = curr.article.Nom_Fournisseur;

    if (!acc[fournisseur]) acc[fournisseur] = [];

    acc[fournisseur].push(curr);

    return acc;
  }, {});

  return (
    <>
      <tbody className="text-end text-[15px]">
        {Object.entries(rowsByFournisseur).map(([provider, rowsGrouped]: [string, any], index) => {
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

          return (
            <Fragment key={index}>
              {rowsGrouped.map((row, i: number) => {
                const Stock_Qte =
                  parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);

                const Vente_Poids = row.article?.AR_PoidsNet * (row.vente?.Qte ?? 0);
                const Stock_Poids = parseFloat(parseDecimal(row.article?.AR_PoidsNet * Stock_Qte));
                const Report_Poids = row.article?.AR_PoidsNet * (row.report?.Qte ?? 0);
                const Achat_Poids = row.article?.AR_PoidsNet * (row.achat?.Qte ?? 0);
                const Prod_Poids = (row.production?.Qte ?? 0) * row.article.AR_PoidsNet;

                // Calcul % vente
                const Vente_p100 = calculateVente_p100(Vente_Poids, Report_Poids, Achat_Poids, Prod_Poids);

                // Calcul % marge
                const Marge_p100 =
                  ((parseFloat(row.article.AC_PrixVen ?? 0) - parseFloat(row.article.AR_PoidsBrut ?? 0)) / parseFloat(row.article.AR_PoidsBrut ?? 0)) * 100;

                return (
                  <tr key={i} className="active:bg-amber-400 hover:bg-slate-100 hover:border hover:border-amber-500">
                    {/* Article */}
                    <td
                      className={clsx("border-orange-400 border", {
                        "text-red-vif": Marge_p100 < 0,
                      })}
                    >
                      {lowerThan15(Vente_p100)}
                    </td>
                    <td className="text-center ">{row.article.Etat}</td>
                    <td>
                      <sub className="text-lg ">{Stock_Poids >= 5000 ? "*" : ""}</sub>
                    </td>
                    <td className="text-start font-bold text-red-600">{row.article.AR_Ref}</td>
                    <td>{parseDecimal(row.article.AR_PrixAch)}</td>
                    <td>{parseDecimal(row.article.AR_PoidsBrut)}</td>
                    <td>{parseDecimal(row.article.AC_PrixVen)}</td>
                    {/* Report */}
                    <td>{parseDecimal(row.report?.Qte)}</td>
                    <td>{parseDecimal(Report_Poids)}</td>
                    <td>{parseDecimal(Report_Poids * row.article.AR_PrixAch)}</td>
                    <td>{parseDecimal(row.article?.AR_PoidsBrut * row.article?.Qte)}</td>
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
              {/* ---------------<>------------- */}
              {
                <Fragment>
                  {/* Row article provider  */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-amber-700 text-start font-semibold">{provider}</td>
                    <td></td>
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-amber-700 text-start font-semibold">-</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* Report */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* Achat */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* Production */}
                    <td></td>
                    <td></td>
                    {/* Vente */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* Stock */}
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* % vente and % marge */}
                    <td></td>
                    <td></td>
                  </tr>
                </Fragment>
              }
            </Fragment>
          );
        })}
      </tbody>
      <TableFoot />
    </>
  );
}

export function calculateVente_p100(Vente_Poids: number, Report_Poids: number, Achat_Poids: number, Prod_Poids: number) {
  let Vente_p100 = Vente_Poids * 100;
  if ((Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0) === 0) Vente_p100 = 0;
  else Vente_p100 /= (Report_Poids ?? 0) + (Achat_Poids ?? 0) + (Prod_Poids ?? 0);
  return Vente_p100;
}

function calculateVente_p100ForOneProvider(rows: Array<any>) {
  const onlyVente_p100 = rows.map((row) => {
    const Stock_Qte = parseInt(row.report?.Qte ?? 0) + parseInt(row.production?.Qte ?? 0) + parseInt(row.achat?.Qte ?? 0) - parseInt(row.vente?.Qte ?? 0);

    const Vente_Poids = row.article?.AR_PoidsNet * (row.vente?.Qte ?? 0);
    const Stock_Poids = parseFloat(parseDecimal(row.article?.AR_PoidsNet * Stock_Qte));
    const Report_Poids = row.article?.AR_PoidsNet * (row.report?.Qte ?? 0);
    const Achat_Poids = row.article?.AR_PoidsNet * (row.achat?.Qte ?? 0);
    const Prod_Poids = (row.production?.Qte ?? 0) * row.article.AR_PoidsNet;

    // Calcul % vente
    return calculateVente_p100(Vente_Poids, Report_Poids, Achat_Poids, Prod_Poids);
  });
  const vente_p100_Provider = onlyVente_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  }, 0);
  return vente_p100_Provider;
}

function calculateMarge_p100ForOneProvider(rows: Array<any>) {
  const onlyMarge_p100 = rows.map(
    (row) => ((parseFloat(row.article.AC_PrixVen ?? 0) - parseFloat(row.article.AR_PoidsBrut ?? 0)) / parseFloat(row.article.AR_PoidsBrut ?? 0)) * 100
  );

  return onlyMarge_p100.reduce((acc, cur, i, array) => {
    if (array.length - 1 === i) return (acc + cur) / array.length;
    return acc + cur;
  });
}
