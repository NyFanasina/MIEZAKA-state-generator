"use client";
import { Button } from "flowbite-react";
import { CategoryFilter, DateFilter, EtatFilter, ProviderFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { useReactToPrint } from "react-to-print";
import { MutableRefObject } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const printPDF = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `MOUVEMENT COMPLET du ${searchParams.get("from")} au ${searchParams.get("to")}`,
  });

  function handlePrint() {
    printPDF();
  }

  return (
    <div className="flex justify-between print:hidden">
      <div
        className={clsx("flex items-start gap-x-1", {
          invisible: pathname.includes("/filters/"),
        })}
      >
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
