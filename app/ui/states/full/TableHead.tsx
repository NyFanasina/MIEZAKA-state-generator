import { FaSort } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLProps, useState } from "react";
import clsx from "clsx";

export default function TableHead() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHovered, setHovered] = useState(false);

  function handleUrl(value: string) {
    const col = searchParams.get("sortBy")?.split("@")[0] ?? "ar_ref";
    const direction = searchParams.get("sortBy")?.split("@")[1] ?? "asc";
    let nextValue = value;

    if (col === value && direction === "asc") {
      nextValue = `${value}@desc`;
    } else {
      nextValue = `${value}@asc`;
    }

    const params = new URLSearchParams(searchParams);
    params.set("sortBy", nextValue);
    router.replace(`${pathname}?${params.toString()}`);
  }
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
        <SortingLogo onClick={(e) => handleUrl("vente_p100")} />
        {/* P, P+ */}
        <SortingLogo onClick={(e) => handleUrl("state")} />
        {/* ---*--- */}
        <SortingLogo onClick={(e) => handleUrl("+5t")} />
        {/* AR_Ref */}
        <SortingLogo onClick={() => handleUrl("ar_ref")} />
        {/* PU Acaht */}
        <SortingLogo onClick={() => handleUrl("pu_achat")} />
        {/* PU Revient */}
        <SortingLogo onClick={() => handleUrl("pu_revient")} />
        {/* PU Gros */}
        <SortingLogo onClick={() => handleUrl("pu_gros")} />
        {/* Report */}
        <SortingLogo onClick={() => handleUrl("report_qte")} />
        <SortingLogo onClick={() => handleUrl("report_poids")} />
        <SortingLogo onClick={() => handleUrl("report_mont_achat")} />
        <SortingLogo onClick={() => handleUrl("report_mont_dedouan")} />
        {/* Achat */}
        <SortingLogo onClick={() => handleUrl("achat_qte")} />
        <SortingLogo onClick={() => handleUrl("achat_poids")} />
        <SortingLogo onClick={() => handleUrl("achat_mont_achat")} />
        <SortingLogo onClick={() => handleUrl("achat_mont_dedouan")} />
        {/* Prod */}
        <SortingLogo onClick={() => handleUrl("prod_qte")} />
        <SortingLogo onClick={() => handleUrl("prod_poids")} />
        {/* Vente */}
        <SortingLogo onClick={() => handleUrl("vente_qte")} />
        <SortingLogo onClick={() => handleUrl("vente_poids")} />
        <SortingLogo onClick={() => handleUrl("vente_mont_dedouan")} />
        <SortingLogo onClick={() => handleUrl("vente_reelle")} />
        {/* Stock */}
        <SortingLogo onClick={() => handleUrl("stock_qte")} />
        <SortingLogo onClick={() => handleUrl("stock_poids")} />
        <SortingLogo onClick={() => handleUrl("stock_mont_dedouan")} />
        {/* vente_p100 et marge_p100 */}
        <SortingLogo onClick={() => handleUrl("vente_p100")} />
        <SortingLogo onClick={() => handleUrl("marge_p100")} />
      </tr>
    </thead>
  );
}

function SortingLogo(props: HTMLProps<any>) {
  const sortingBy = useSearchParams().get("sortBy")?.split("@")[0];

  const value = (props.onClick?.toString().match(/handleUrl\(["']([^"']+)["']\)/) ?? [])[1];
  const isColored = sortingBy === value;
  return (
    <td {...props}>
      <i>
        <FaSort
          className={clsx("mx-auto", {
            "text-red-vif": isColored,
          })}
        />
      </i>
    </td>
  );
}
