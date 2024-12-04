"use server";
import { fetcthBestSellerByVente_Reel } from "@/app/lib/data/ste_utils";
import { parseDecimal } from "@/app/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default async function BestSellerAmountTable() {
  let data = await fetcthBestSellerByVente_Reel();

  return (
    <div>
      <Table>
        <TableHead>
          <TableHeadCell>Article</TableHeadCell>
          <TableHeadCell>Désignation</TableHeadCell>
          <TableHeadCell>Qte vendus</TableHeadCell>
          <TableHeadCell>Vente Réelle</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.map(({ AR_Design, AR_Ref, Qte_Vente, Vente_Reelle }, i: number) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white py-0">{AR_Ref}</TableCell>
              <TableCell>{AR_Design}</TableCell>
              <TableCell className="text-end">{parseDecimal(Qte_Vente)}</TableCell>
              <TableCell className="text-end">{parseDecimal(Vente_Reelle)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
