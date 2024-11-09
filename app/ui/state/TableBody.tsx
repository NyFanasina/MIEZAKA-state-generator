import { DateSearchParamsProps } from "@/app/(views)/states/page";
import { fecthAchats, fecthArticles, fetchProductions, fetchReports, fetchVentes } from "@/app/lib/data/ste";
import { lowerThan15, parseDecimal } from "@/app/lib/utils";
import { clsx } from "clsx";

export default async function TableBody({ searchParams }: DateSearchParamsProps) {
  const articles = await fecthArticles();
  const achats = await fecthAchats(searchParams?.from, searchParams?.to);
  const ventes = await fetchVentes(searchParams?.from, searchParams?.to);
  const productions = await fetchProductions(searchParams?.from, searchParams?.to);
  const reports = await fetchReports(searchParams?.from);

  const rows: Array<any> = await articles.map((article: any) => {
    return {
      article,
      achat: achats.filter((achat) => achat.AR_Ref == article.AR_Ref)[0],
      vente: ventes.filter((vente) => vente.AR_Ref == article.AR_Ref)[0],
      production: productions.filter((prod) => prod.AR_Ref == article.AR_Ref)[0],
      report: reports.filter((report) => report.AR_Ref == article.AR_Ref)[0],
    };
  });

  const rowsGroupedByFournisseur = rows.reduce((acc: Array<any>, curr, i) => {
    const fournisseur = curr.article.Nom_Fournisseur;

    if (!acc[fournisseur]) acc[fournisseur] = [];

    acc[fournisseur].push(curr.article.AR_Ref);

    return acc;
  }, []);

  console.log(" ----> \n", rowsGroupedByFournisseur);

  return (
    <tbody className="text-end text-[15px]">
      {rows.map((row: any, i: number) => {
        const Stock_Qte =
          parseInt(row.report?.Report_Qte ?? 0) +
          parseInt(row.production?.Prod_Qte ?? 0) +
          parseInt(row.achat?.Achat_Qte ?? 0) -
          parseInt(row.vente?.Vente_Qte ?? 0);

        const Vente_Poids = parseDecimal(row.article?.AR_PoidsNet * row.vente?.Vente_Qte);
        const Stock_Poids = parseFloat(parseDecimal(row.article?.AR_PoidsNet * Stock_Qte));
        const Report_Poids = parseDecimal(row.article?.AR_PoidsNet * row.report?.Report_Qte);
        const Achat_Poids = parseDecimal(row.article?.AR_PoidsNet * row.achat?.Achat_Qte);
        const Prod_Poids = parseDecimal(row.production?.Prod_Qte * row.article.AR_PoidsNet);

        // Calcul % vente
        let Vente_p100 = parseFloat(Vente_Poids) * 100;
        if (!(parseFloat(Report_Poids ?? 0) + parseFloat(Achat_Poids ?? 0) + parseFloat(Prod_Poids ?? 0))) Vente_p100 /= 1;
        else Vente_p100 /= parseFloat(Report_Poids ?? 0) + parseFloat(Achat_Poids ?? 0) + parseFloat(Prod_Poids ?? 0);

        // Calcul % marge
        const Marge_p100 = (parseFloat(row.article.AC_PrixVen ?? 0) - parseFloat(row.article.AR_PoidsBrut ?? 0)) / parseFloat(row.article.AR_PoidsBrut ?? 0);

        // INFO Fournisseur

        return (
          <tr key={i}>
            {/* Article */}
            <td
              className={clsx("border-orange-400 border ", {
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
            <td>{parseDecimal(row.report?.Report_Qte)}</td>
            <td>{Report_Poids}</td>
            <td>{parseDecimal(row.article?.AR_PoidsNet * row.report?.Report_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.article?.Report_Qte)}</td>
            {/* Achats */}
            <td>{parseDecimal(row.achat?.Achat_Qte)}</td>
            <td>{Achat_Poids}</td>
            <td>{parseDecimal(row.article?.AR_PrixAch * row.achat?.Achat_Qte)}</td>
            <td>{parseDecimal(row.achat?.Achat_Qte * row.article?.AR_PoidsBrut)}</td>
            {/* Production */}
            <td>{parseDecimal(row.production?.Prod_Qte)}</td>
            <td>{Prod_Poids}</td>
            {/* Vente */}
            <td>{parseDecimal(row.vente?.Vente_Qte)}</td>
            <td>{Vente_Poids}</td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.vente?.Vente_Qte)}</td>
            <td>{parseDecimal(row.vente?.Vente_Reelle)}</td>
            {/* Stock */}
            <td>{parseDecimal(Stock_Qte)}</td>
            <td>{Stock_Poids}</td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * Stock_Qte)}</td>
            {/* %vente et Marge % */}
            <td className="border-orange-400 border text-red ">{Vente_p100.toFixed(2)}</td>
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
    </tbody>
  );
}
