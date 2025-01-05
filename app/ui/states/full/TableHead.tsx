import { useState } from "react";
import clsx from "clsx";
import { SortingLogo } from "../SortingLogo";

export default function TableHead() {
  const [isHovered, setHovered] = useState(false);

  return (
    <thead onMouseLeave={() => setHovered(false)}>
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
        <th colSpan={4} className="bg-blue-200 text-blue-800 border-blue-400 border">
          VENTE
        </th>
        <th colSpan={3} className="bg-slate-100 text-gray-800 border-gray-400 border">
          STOCK
        </th>
        <th colSpan={2}></th>
      </tr>
      <tr onMouseEnter={() => setHovered(true)}>
        <th colSpan={4} className="bg-orange-200 text-orange-700 border-orange-300 border py-[10px]">
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
        <th className="bg-green-200 text-emerald-900 border-green-400 border">Mont Dédouané</th>
        <th className="bg-rose-200 text-orange-800 border-rose-300 border">Qte</th>
        <th className="bg-rose-200 text-orange-800 border-rose-300 border">Poids</th>
        <th className="bg-blue-200 text-blue-800 border-blue-400 border">Qte</th>
        <th className="bg-blue-200 text-blue-800 border-blue-400 border">Poids</th>
        <th className="bg-blue-200 text-blue-800 border-blue-400 border">Mont Dédouané</th>
        <th className="bg-blue-200 text-blue-800 border-blue-400 border">Vente Réelle</th>
        <th className="bg-gray-100 text-gray-800 border-gray-400 border">Qte</th>
        <th className="bg-gray-100 text-gray-800 border-gray-400 border">Poids</th>
        <th className="bg-gray-100 text-gray-800 border-gray-400 border">Mont Dédouané</th>
        <th className="bg-orange-300 text-orange-800 border-orange-400 border">Vente %</th>
        <th className="bg-orange-300 text-orange-800 border-orange-400 border">Marge %</th>
      </tr>
      <tr
        className={clsx("print:hidden border border-1 shadow", {
          hidden: !isHovered,
        })}
      >
        {/* -15 +75 */}
        <SortingLogo term="vente_p100" />
        {/* P, P+ */}
        <SortingLogo term="state" />
        {/* ---*--- */}
        <SortingLogo term="+5t" />
        {/* AR_Ref */}
        <SortingLogo term="ar_ref" />
        {/* PU Acaht */}
        <SortingLogo term="pu_achat" />
        {/* PU Revient */}
        <SortingLogo term="pu_revient" />
        {/* PU Gros */}
        <SortingLogo term="pu_gros" />
        {/* Report */}
        <SortingLogo term="report_qte" />
        <SortingLogo term="report_poids" />
        <SortingLogo term="report_mont_achat" />
        <SortingLogo term="report_mont_dedouan" />
        {/* Achat */}
        <SortingLogo term="achat_qte" />
        <SortingLogo term="achat_poids" />
        <SortingLogo term="achat_mont_achat" />
        <SortingLogo term="achat_mont_dedouan" />
        {/* Prod */}
        <SortingLogo term="prod_qte" />
        <SortingLogo term="prod_poids" />
        {/* Vente */}
        <SortingLogo term="vente_qte" />
        <SortingLogo term="vente_poids" />
        <SortingLogo term="vente_mont_dedouan" />
        <SortingLogo term="vente_reelle" />
        {/* Stock */}
        <SortingLogo term="stock_qte" />
        <SortingLogo term="stock_poids" />
        <SortingLogo term="stock_mont_dedouan" />
        {/* vente_p100 et marge_p100 */}
        <SortingLogo term="vente_p100" />
        <SortingLogo term="marge_p100" />
      </tr>
    </thead>
  );
}
