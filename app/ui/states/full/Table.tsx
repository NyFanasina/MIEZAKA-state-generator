import { SearchParamsStatesProps } from "@/app/(views)/states/full/page";
import TableBody from "./TableBody";
import { fecthAchats, fecthArticles, fetchProductions, fetchReports, fetchVentes } from "@/app/lib/data/ste";
import { Suspense } from "react";
import TableFoot from "./TableFoot";
import { Mouvement } from "@/app/lib/ste_definition";
import filterData from "@/app/lib/utils";

export default async function StateTable({ searchParams }: SearchParamsStatesProps) {
  // const articles = await fecthArticles(searchParams?.to);
  // const reports = await fetchReports(searchParams?.from);
  // const achats = await fecthAchats(searchParams?.from, searchParams?.to);
  // const ventes = await fetchVentes(searchParams?.from, searchParams?.to);
  // const productions = await fetchProductions(searchParams?.from, searchParams?.to);

  // let rows: Array<any> = await articles.map((article: any) => {
  //   return {
  //     article,
  //     achat: achats.filter((achat) => achat.AR_Ref == article.AR_Ref)[0],
  //     vente: ventes.filter((vente) => vente.AR_Ref == article.AR_Ref)[0],
  //     production: productions.filter((prod) => prod.AR_Ref == article.AR_Ref)[0],
  //     report: reports.filter((report) => report.AR_Ref == article.AR_Ref)[0],
  //   };
  // });
  let rows: Array<Mouvement> = require("/home/fango/Bureau/Data.json");
  rows = filterData(searchParams, rows);

  rows = await JSON.parse(JSON.stringify(rows));

  return (
    <div className="flex justify-center">
      <table className="text-[11px] state-table w-min table-auto mb-12 overflow-x-scroll">
        <thead>
          <tr className="text-[12px]">
            <th colSpan={7}></th>
            <th colSpan={4} className="bg-violet-300 text-violet-950 border-violet-400 border py-1">
              REPORT
            </th>
            <th colSpan={4} className="bg-green-200 text-emerald-900 border-green-400 border">
              ACHAT
            </th>
            <th colSpan={2} className="bg-pink-200 text-orange-800 border-rose-300 border">
              PRODUCTION
            </th>
            <th colSpan={4} className="bg-blue-200 text-blue-950 border-blue-400 border">
              VENTE
            </th>
            <th colSpan={3} className="bg-slate-100 text-gray-800 border-gray-400 border">
              STOCK
            </th>
            <th colSpan={2}></th>
          </tr>
          <tr>
            <th colSpan={4} className="bg-orange-200 text-orange-700 border-orange-300 border">
              Référence Articles
            </th>
            <th className="bg-orange-200 text-orange-700 border-orange-300 border">PU Ach</th>
            <th className="bg-orange-200 text-orange-700 border-orange-300 border">PU Revient</th>
            <th className="bg-orange-200 text-orange-700 border-orange-300 border">PU Gros</th>
            <th className="bg-violet-300 text-violet-950 border-violet-400 border">Qte</th>
            <th className="bg-violet-300 text-violet-950 border-violet-400 border">Poids</th>
            <th className="bg-violet-300 text-violet-950 border-violet-400 border">Mont Arch</th>
            <th className="bg-violet-300 text-violet-950 border-violet-400 border">Mont Dédouané</th>
            <th className="bg-green-200 text-emerald-900 border-green-400 border">Qte</th>
            <th className="bg-green-200 text-emerald-900 border-green-400 border">Poids</th>
            <th className="bg-green-200 text-emerald-900 border-green-400 border">Mont Ach</th>
            <th className="bg-green-200 text-emerald-900 border-green-400 border">Mont Dédouancé</th>
            <th className="bg-rose-200 text-orange-800 border-rose-300 border">Qte</th>
            <th className="bg-rose-200 text-orange-800 border-rose-300 border">Poids</th>
            <th className="bg-blue-200 text-blue-950 border-blue-400 border">Qte</th>
            <th className="bg-blue-200 text-blue-950 border-blue-400 border">Poids</th>
            <th className="bg-blue-200 text-blue-950 border-blue-400 border">Mont Dédouané</th>
            <th className="bg-blue-200 text-blue-950 border-blue-400 border">Vente</th>
            <th className="bg-gray-100 text-gray-800 border-gray-400 border">Qte</th>
            <th className="bg-gray-100 text-gray-800 border-gray-400 border">Poids</th>
            <th className="bg-gray-100 text-gray-800 border-gray-400 border">Mont Dédouané</th>
            <th className="bg-orange-300 text-orange-800 border-orange-400 border">Vente %</th>
            <th className="bg-orange-300 text-orange-800 border-orange-400 border">Marge %</th>
          </tr>
        </thead>
        <Suspense>
          <TableBody rows={rows} />
        </Suspense>
        <TableFoot rows={rows} />
      </table>
    </div>
  );
}
