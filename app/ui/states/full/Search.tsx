"use client";
import { Button } from "flowbite-react";
import { CategoryFilter, DateFilter, EtatFilter, ProviderFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { useReactToPrint } from "react-to-print";
import { MutableRefObject } from "react";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  const printPDF = useReactToPrint({ contentRef: pdfRef });
  function handlePrint() {
    printPDF();
  }

  return (
    <div className="flex justify-between print:hidden">
      <div className="flex items-start gap-x-1">
        <CategoryFilter />
        <ProviderFilter />
        <WeightFilter />
        <Vente_p100_Filter />
        <EtatFilter />
      </div>
      <DateFilter>
        <Button
          onClick={() => {
            handlePrint();
          }}
        ></Button>
      </DateFilter>
    </div>
  );
}
