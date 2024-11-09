import { DateSearchParamsProps } from "@/app/(views)/states/page";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";

export default function StateTable({ searchParams }: DateSearchParamsProps) {
  return (
    <table id="state-table" className="text-sm">
      <thead>
        <tr>
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
        <tr className="text-[14px]">
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
      <TableBody searchParams={searchParams} />
      <TableFoot />
    </table>
  );
}
