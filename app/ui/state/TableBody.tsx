import { DateSearchParamsProps } from "@/app/(views)/states/page";
import { fecthAchats, fecthArticles, fetchProductions, fetchReports, fetchStock, fetchVentes } from "@/app/lib/data/ste";
import { parseDecimal } from "@/app/lib/utils";

export default async function TableBody({ searchParams }: DateSearchParamsProps) {
  const articles = await fecthArticles(searchParams?.from, searchParams?.to);
  const achats = await fecthAchats();
  const ventes = await fetchVentes();
  const productions = await fetchProductions();
  const reports = await fetchReports(searchParams?.from);

  console.log(reports);

  const rows = await articles.map((article: any) => {
    return {
      article,
      achat: achats.filter((achat) => achat.AR_Ref == article.AR_Ref)[0],
      vente: ventes.filter((vente) => vente.AR_Ref == article.AR_Ref)[0],
      production: productions.filter((prod) => prod.AR_Ref == article.AR_Ref)[0],
      report: reports.filter((report) => report.AR_Ref == article.AR_Ref)[0],
    };
  });

  return (
    <tbody className="text-end text-[15px]">
      {rows.map((row: any, i: number) => {
        const Stock_Qte = (row.achat?.Achat_Qte ?? 0) + (row.report?.Report_Qte ?? 0) + (row.production?.Prod_Qte ?? 0) - (row.vente?.Vente_Qte ?? 0);
        return (
          <tr key={i}>
            {/* Article */}
            <td>-15</td>
            <td>{row.article.Etat}</td>
            <td>*</td>
            <td className="text-red-700 font-bold text-start">{row.article.AR_Ref}</td>
            <td>{parseDecimal(row.article.AR_PrixAch)}</td>
            <td>{parseDecimal(row.article.Prix_Revient)}</td>
            <td>{parseDecimal(row.article.AC_PrixVen)}</td>
            {/* Report */}
            <td>{parseDecimal(row.report?.Report_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsNet * row.report?.Report_Qte)}</td>
            <td></td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.article?.Report_Qte)}</td>
            {/* Achats */}
            <td>{parseDecimal(row.achat?.Achat_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsNet * row.achat?.Achat_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PrixAch * row.achat?.Achat_Qte)}</td>
            <td>{parseDecimal(row.achat?.Achat_Qte * row.article?.AR_PoidsBrut)}</td>
            {/* Production */}
            <td>{parseDecimal(row.production?.Prod_Qte)}</td>
            <td>{parseDecimal(row.production?.Prod_Qte * row.article.AR_PoidsNet)}</td>
            {/* Vente */}
            <td>{parseDecimal(row.vente?.Vente_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsNet * row.vente?.Vente_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * row.vente?.Vente_Qte)}</td>
            <td>{parseDecimal(row.vente?.Vente_Reel)}</td>
            {/* Stock */}
            <td>{parseDecimal(Stock_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsNet * Stock_Qte)}</td>
            <td>{parseDecimal(row.article?.AR_PoidsBrut * Stock_Qte)}</td>
            <td className="border-orange-400 border"></td>
            <td className="border-orange-400 border"></td>
          </tr>
        );
      })}
    </tbody>
  );
}
