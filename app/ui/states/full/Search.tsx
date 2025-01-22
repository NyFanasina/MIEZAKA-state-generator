"use client";
import { Button } from "flowbite-react";
import { CategoryFilter, DateFilter, EtatFilter, ProviderFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { useReactToPrint } from "react-to-print";
import { MutableRefObject, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Table from "@/app/ui/states/full/Table";
import Header from "../Header";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pdfRef = useRef(null);
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

      {/* Document PDF */}
      <div ref={pdfRef} className="hidden print:block">
        <Header>MOUVEMENT ARTICLE COMPLET</Header>
        <Table print={true} />
      </div>
    </div>
  );
}
