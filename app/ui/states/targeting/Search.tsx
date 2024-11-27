"use client";
import { MutableRefObject } from "react";
import { CategoryFilter, DateFilter, EtatFilter, TextInputFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { Button } from "flowbite-react";
import { useReactToPrint } from "react-to-print";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  const printPdf = useReactToPrint({ contentRef: pdfRef });
  return (
    <div className="flex justify-between items-start print:hidden">
      <div className="*:p-[2px]">
        <div className="flex gap-1">
          <CategoryFilter />
          <Vente_p100_Filter />
          <WeightFilter />
          <EtatFilter />
        </div>
        <div className="flex *:flex-1 gap-x-1">
          <TextInputFilter name="ar_ref" placeholder="Recherche par réfénce.." />
          <TextInputFilter name="design" placeholder="Recherche par désignation.." />
        </div>
      </div>
      <DateFilter>
        <Button onClick={() => printPdf()}>EXPORT</Button>
      </DateFilter>
    </div>
  );
}
