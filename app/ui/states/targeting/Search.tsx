"use client";
import { useRef } from "react";
import { CategoryFilter, DateFilter, EtatFilter, ProviderFilter, TextInputFilter, Vente_p100_Filter, WeightFilter } from "../Filters";
import { Button } from "flowbite-react";
import { useReactToPrint } from "react-to-print";
import Header from "../Header";
import Table from "./Table";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pdfRef = useRef(null);
  const printPdf = useReactToPrint({ documentTitle: `CIBLAGE ARTICLES du ${searchParams.get("from")} au ${searchParams.get("to")}`, contentRef: pdfRef });

  return (
    <div className="flex justify-between items-start print:hidden">
      <div className="*:p-[2px]">
        <div className="flex gap-1">
          <CategoryFilter />
          <ProviderFilter />
          <Vente_p100_Filter />
          <WeightFilter />
          <EtatFilter />
        </div>
        <div className="flex *:flex-1 gap-x-1">
          <TextInputFilter name="ar_ref" placeholder="Recherche par reférence.." />
          <TextInputFilter name="design" placeholder="Recherche par désignation.." />
        </div>
      </div>
      <DateFilter>
        <Button onClick={() => printPdf()}>EXPORT</Button>
      </DateFilter>

      {/* Document PDF */}
      <div ref={pdfRef} className="hidden print:block">
        <Header>CIBLAGE ARTICLES</Header>
        <Table print={true}></Table>
      </div>
    </div>
  );
}
