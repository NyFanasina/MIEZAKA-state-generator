"use client";
import { MutableRefObject } from "react";
import { DateFilter, ProviderFilter } from "../Filters";
import { Button } from "flowbite-react";
import { useReactToPrint } from "react-to-print";

export default function Search({ pdfRef }: { pdfRef: MutableRefObject<any> }) {
  const printPdf = useReactToPrint({ contentRef: pdfRef });
  return (
    <div className="flex justify-between print:hidden">
      <div className="flex items-start gap-x-1">
        <ProviderFilter />
      </div>
      <DateFilter>
        <Button onClick={() => printPdf()}>EXPORT</Button>
      </DateFilter>
    </div>
  );
}
