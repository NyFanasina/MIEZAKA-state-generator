"use server";
import { fetchTopVente } from "@/app/lib/data/ste_utils";
import { parseDecimal } from "@/app/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default async function BestSellerQteTable() {
  let data = await fetchTopVente("Qte_Vente", "2024");
  // let data = [
  //   { AR_Design: "Cravatte pour bebe homme.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  //   { AR_Design: "Lorem ipsum dolor sit amet.", AR_Ref: "LH_Hs23C", Qte_Vente: 253 },
  // ];
  // data = data.toSorted((a, b) => Number(b.Qte_Vente) - Number(a.Qte_Vente));

  return (
    <div>
      <Table hoverable>
        <TableHead className="sticky top-0">
          <TableHeadCell>Article</TableHeadCell>
          <TableHeadCell>Désignation</TableHeadCell>
          <TableHeadCell>Qte vendus</TableHeadCell>
          <TableHeadCell>Montant Dedouané</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.map(({ AR_Design, AR_Ref, Qte_Vente, Montant_Dedouan }, i: number) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white py-0">{AR_Ref}</TableCell>
              <TableCell>{AR_Design}</TableCell>
              <TableCell className="text-end">{parseDecimal(Qte_Vente)}</TableCell>
              <TableCell className="text-end">{parseDecimal(Montant_Dedouan)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
