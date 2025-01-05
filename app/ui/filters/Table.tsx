import { fetchFilters } from "@/app/lib/data/filters";
import { formatDateToFr } from "@/app/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { TableButton } from "./TableButtons";
import Link from "next/link";

export default async function table({ filtername }: { filtername?: string }) {
  const filters = await fetchFilters(filtername);
  const to = new Date().toISOString().split("T")[0];
  const from = `${new Date().getFullYear()}-01-01`;

  return (
    <div className="overflow-x-auto mt-6">
      <Table theme={theme}>
        <TableHead>
          <TableHeadCell>Nom du filtre</TableHeadCell>
          <TableHeadCell>Catégorie</TableHeadCell>
          <TableHeadCell>Fournisseur(s)</TableHeadCell>
          <TableHeadCell>Poids stock</TableHeadCell>
          <TableHeadCell>Vente %</TableHeadCell>
          <TableHeadCell>État</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Date Modification</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {filters.map((filter, i) => (
            <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white hover:underline">
                <Link href={`/filters/${filter.filter_name}?from=${from}&to=${to}`}>{filter.filter_name}</Link>
              </TableCell>
              <TableCell>{filter.filter_category || "Tous"}</TableCell>
              <TableCell>{filter.filter_supplier?.replaceAll("+", ", ") || "Tous"}</TableCell>
              <TableCell>{filter.filter_stock_weight || "Tous"}</TableCell>
              <TableCell>{filter.filter_marge || "Tous"}</TableCell>
              <TableCell>{filter.filter_etat || "Tous"}</TableCell>
              <TableCell>{getType(filter.filter_type)}</TableCell>
              <TableCell>{formatDateToFr(filter.updated_at)}</TableCell>
              <TableCell className="p-0">
                <TableButton filter={filter} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const theme = {
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-2 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
};

const getType = (value: number) => (!value ? "MOUVEMENT COMPLET" : "CIBLAGE ARTICLE");
