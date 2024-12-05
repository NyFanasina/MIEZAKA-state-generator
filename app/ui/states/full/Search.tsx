"use client";
import { Button } from "flowbite-react";
import { CategoryFilter, DateFilter, EtatFilter, ProviderFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { useReactToPrint } from "react-to-print";
import { MutableRefObject } from "react";
import jsPDF from "jspdf";
import { useParams, useSearchParams } from "next/navigation";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  const searchParams = useSearchParams();
  const printPDF = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `MOUVEMENT COMPLET du ${searchParams.get("from")} au ${searchParams.get("to")}`,
  });

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
        >
          EXPORTER
        </Button>
      </DateFilter>
    </div>
  );
}
